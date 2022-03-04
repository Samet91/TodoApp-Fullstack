import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../../model";

export default function Edit() {
  const [titleToEdit, setTitleToEdit] = useState("");
  const [descriptionToEdit, setDescriptionToEdit] = useState("");

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/${params.todoId}`)
      .then((response) => response.json())
      .then((todo: Todo) => {
        setTitleToEdit(todo.title);
        setDescriptionToEdit(todo.description);
      });
  }, [params.todoId]);

  const changeTodo = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/todo/${params.todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleToEdit,
        description: descriptionToEdit,
      }),

    }).then(() => navigate("/TodoList"))
  };

  return (
    <div>
      <form onSubmit={changeTodo}>
        <input
          type="text"
          value={titleToEdit}
          onChange={(e) => setTitleToEdit(e.target.value)}
        />
        <div>
          <input
            type="text"
            value={descriptionToEdit}
            onChange={(e) => setDescriptionToEdit(e.target.value)}
          />
          <span>
            <button type="submit">Edit</button>
          </span>
        </div>
      </form>
    </div>
  );
}
