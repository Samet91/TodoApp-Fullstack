import { TodoProps } from "../model";
import styled from "styled-components";

export default function TodoItem(props: TodoProps) {
  const deleteTodo = () => {
    fetch(`http://localhost:8080/todos/${props.id}`, {
      method: "DELETE",
    }).then(response => props.onItemChange());
  };

  return (
    <Card>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
      <Completed>{props.completed}</Completed>
      <button onClick={() => deleteTodo()}>delete</button>
    </Card>
  );
}

const Card = styled.div`
  border: solid 2px;
  margin: 5px;
`

const Title = styled.h3`
  margin: 5px;
`

const Description = styled.p`
  margin: 5px;
`

const Completed = styled.p`
  margin: 5px;
`
