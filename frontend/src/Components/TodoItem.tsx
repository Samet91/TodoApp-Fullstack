import { Todo } from "../model";
import styled from "styled-components";

interface TodoItemProps {
  todo: Todo;
  onTodoDeletion: () => void;
  onTodoChange: (todos: Array<Todo>) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const deleteTodo = () => {
    fetch(`http://localhost:8080/todo/${props.todo.id}`, {
      method: "DELETE",
    }).then(() => props.onTodoDeletion());
  };

  const toggle = () => {
    fetch(`http://localhost:8080/todo/${props.todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: props.todo.title,
        description: props.todo.description,
        completed: props.todo.completed,
      }),
    })
      .then((response) => response.json())
      .then((todosFromBackend: Array<Todo>) =>
        props.onTodoChange(todosFromBackend)
      );
  };

  return (
    <Card>
      <Title>{props.todo.title}</Title>
      <Description>{props.todo.description}</Description>
      <Completed>{props.todo.completed}</Completed>
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
