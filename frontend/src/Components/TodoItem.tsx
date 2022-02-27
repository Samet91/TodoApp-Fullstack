import { TodoProps } from "../model";

export default function TodoItem(props: TodoProps) {
  const deleteTodo = () => {
    fetch(`http://localhost:8080/todos/${props.id}`, {
      method: "DELETE",
    }).then(response => props.onItemChange());
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>{props.completed}</p>
      <button onClick={() => deleteTodo()}>delete</button>
    </div>
  );
}
