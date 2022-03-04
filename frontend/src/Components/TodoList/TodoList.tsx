import { t } from "i18next";
import { useEffect, useState } from "react";
import { Todo } from "../../model";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
  const [items, setItems] = useState([] as Array<Todo>);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = (
    url: string = `${process.env.REACT_APP_BASE_URL}/todo`
  ) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(
          "Fehler beim ermitteln der Daten. statuscode: " + response.status
        );
      })
      .then((responseBody: Array<Todo>) => {
        setItems(responseBody);
      })
      .catch((e) => setErrorMessage(e.message));
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
          <TodoItem key={todo.id} todo={todo} onTodoDeletion={fetchData} />
        ))}
        {errorMessage}
      </div>
    </div>
  );
}
