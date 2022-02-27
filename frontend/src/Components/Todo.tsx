import { useEffect, useState } from "react";
import { TodoProps } from "../model";
import TodoItem from "./TodoItem";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [items, setItems] = useState([] as Array<TodoProps>);

  useEffect(() => {
    fetchData();
}, []);

  const fetchData = (url: string = "http://localhost:8080/todo") => {
    fetch(url)
      .then((response) => response.json())
      .then((responseBody: Array<TodoProps>) => {
        setItems(responseBody);
      });
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
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <button onClick={() => fetchData("http://localhost:8080/todo")}>
        Alle Neuen Todos
      </button>

      <div>
        {items.map((todo) => (
          <TodoItem
            title={todo.title}
            description={todo.description}
            completed={false}
            onItemChange={fetchData}
          />
          
        ))}
        
        
      </div>
      
      
    </div>
    
  );
}
