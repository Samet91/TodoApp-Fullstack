import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Todo } from "../../model";

interface TodoFormProps {
  onTodosChange: (todo: Array<Todo>) => void;
}

export default function TodoForm(props: TodoFormProps) {
  const [title, setTitle] = useState(localStorage.getItem("title") ?? "");
  const [description, setDescription] = useState(
    localStorage.getItem("desc") ?? ""
  );

  const { t } = useTranslation();

  const addTodo = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo`, {
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
        props.onTodosChange(todosFromBackend)
      );
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem("desc", description);
  }, [title, description]);

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

      <button onClick={addTodo}>{t("buttonSend")}</button>
    </div>
  );
}
