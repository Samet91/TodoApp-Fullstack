import { Todo } from "../../model";
import styled from "styled-components";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onTodoDeletion: () => void;
  onTodoChange: (todos: Array<Todo>) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const [completed, setCompleted] = useState(props.todo.completed);
  const [titleToEdit, setTitleToEdit] = useState(props.todo.title);
  const [descriptionToEdit, setDescriptionToEdit] = useState(
    props.todo.description
  );
  const [editMode, setEditMode] = useState(false);

  const deleteTodo = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/${props.todo.id}`, {
      method: "DELETE",
    }).then(() => props.onTodoDeletion());
  };

  const complete = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/${props.todo.id}`, {
      method: "PUT",
    }).then(() => props.onTodoDeletion());
  };

  const fetchToEdit = (todo: Todo) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/${props.todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((todosFromBackend: Array<Todo>) => {
        props.onTodoChange(todosFromBackend);
        setEditMode(false);
      });
  };

  const editTodo = () => {
    fetchToEdit({
      id: props.todo.id,
      title: titleToEdit,
      description: descriptionToEdit,
      completed: props.todo.completed,
    });
  };

  // const toggle = () => {
  //   const isCompleted = !props.todo.completed;
  //   fetchToEdit({
  //     id: props.todo.id,
  //     title: props.todo.title,
  //     description: props.todo.description,
  //     completed: isCompleted,
  //   });
  // };

  return (
    <Card>
      {editMode ? (
        <div>
          <input
            type="text"
            value={titleToEdit}
            onChange={(e) => setTitleToEdit(e.target.value)}
          />
          <div>
            <input
              type="text"
              value={descriptionToEdit}
              onChange={(e) => setDescriptionToEdit(e.target.value)}
            />

            <span>
              <button onClick={() => editTodo()}>Edit</button>
            </span>
          </div>
        </div>
      ) : (
        <div>
          <Title>{props.todo.title}</Title>
          <Description>{props.todo.description}</Description>
          <button onClick={() => setEditMode(true)}>edit</button>
        </div>
      )}

      <Completed>{props.todo.completed}</Completed>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(!completed)}
        onClick={complete}
      />
      <button onClick={deleteTodo}>delete</button>
    </Card>
  );
}

const Card = styled.div`
  border: solid 2px;
  margin: 5px;
`;

const Title = styled.h3`
  margin: 5px;
`;

const Description = styled.p`
  margin: 5px;
`;

const Completed = styled.p`
  margin: 5px;
`;
