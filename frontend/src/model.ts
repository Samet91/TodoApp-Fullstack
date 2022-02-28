export interface Todo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  onItemChange: () => void;
}

export interface Response {
    results: Array<Todo>
}
