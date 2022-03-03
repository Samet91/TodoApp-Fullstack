import { t } from "i18next";
import { useEffect, useState } from "react";
import { Todo } from "../../model";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
  const [items, setItems] = useState([] as Array<Todo>);

  const fetchData = (
    url: string = `${process.env.REACT_APP_BASE_URL}/todo`
  ) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseBody: Array<Todo>) => {
        setItems(responseBody);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTodo = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseBody) => setItems(responseBody));
  };

  return (
    <div>
      <TodoForm onTodosChange={setItems} />
    
      <button onClick={deleteTodo}>{t("buttonLabelClear")}</button>
      <div>
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onTodoDeletion={fetchData}
            onTodoChange={setItems}
          />
        ))}
      </div>
    </div>
  );
}
