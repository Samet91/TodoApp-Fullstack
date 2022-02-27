import { useEffect, useState } from "react";
import { TodoProps } from "../model";
import TodoItem from "./TodoItem";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [items, setItems] = useState([] as Array<TodoProps>);

  const fetchData = (url: string = "http://localhost:8080/todo") => {
    fetch(url)
      .then((response) => response.json())
      .then((responseBody: Array<TodoProps>) => {
        setItems(responseBody);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(items);

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="title"
        value={description}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="radio"
        placeholder="title"
        value={completed}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => fetchData("http://localhost:8080/todo")}>
        Alle Neuen Todos
      </button>
     

      <div>
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </div>
  );
}
