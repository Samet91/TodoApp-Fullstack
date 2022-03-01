import { useState } from "react";
import { Todo } from "../model";

interface TodoFormProps {
  onTodosChange: (todo: Array<Todo>) => void;
}

export default function TodoForm(todo: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((todosFromBackend: Array<Todo>) =>
        todo.onTodosChange(todosFromBackend)
      );
    setTitle("");
    setDescription("");
  };

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
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addTodo}>Senden</button>
    </div>
  );
}
