import { Todo } from "../../model";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

interface TodoItemProps {
  todo: Todo;
  onTodoDeletion: () => void;
}

export default function TodoItem(props: TodoItemProps) {
  const [completed, setCompleted] = useState(props.todo.completed);

  const deleteTodo = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/${props.todo.id}`, {
      method: "DELETE",
    }).then(() => props.onTodoDeletion());
  };

  const complete = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/complete/${props.todo.id}`, {
      method: "PUT",
    }).then(() => props.onTodoDeletion());
  };

  return (
    <Card>
      <div>
        <Title>{props.todo.title}</Title>
        <Description>{props.todo.description}</Description>
        <span>
          <Link to={`/TodoList/${props.todo.id}`}>edit</Link>
        </span>
      </div>

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
