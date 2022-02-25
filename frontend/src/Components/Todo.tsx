import { useEffect, useState } from "react";
import { TodoProps } from "../model";

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

  return (
    <div>
      <button onClick={() => fetchData("http://localhost:8080/todo")}>
        Alle Neuen Todos
      </button>
      <button onClick={() => fetchData("http://localhost:8080/todo")}>
        Alle
      </button>

      {items}
    </div>
  );
}
