
type todoItemProps = {
  title: string;
  description: string;
  completed: boolean;
};

export default function TodoItem(todoItemProps: todoItemProps) {
  return (
    <div>
      <h3>{todoItemProps.title}</h3>
      <p>{todoItemProps.description}</p>
      <p>{todoItemProps.completed}</p>
    </div>
  );
}
