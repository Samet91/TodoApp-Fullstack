import { useEffect, useState } from "react";
import { Todo } from "../model";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [items, setItems] = useState([] as Array<Todo>);

  const fetchData = (url: string = "http://localhost:8080/todo") => {
    fetch(url)
      .then((response) => response.json())
      .then((responseBody: Array<Todo>) => {
        setItems(responseBody);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <TodoForm onTodosChange={setItems} /> 
      <button onClick={() => fetchData("http://localhost:8080/todo")} >
        Alle Neuen Todos
      </button>

      <div>
        {items.map((todo) => (
          <TodoItem
            key={todo.id} todo={todo} onTodoDeletion={fetchData} onTodoChange={setItems}
          />
        ))}
      </div>
    </div>
  );
}
