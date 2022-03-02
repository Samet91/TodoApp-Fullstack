export interface Todo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Response {
    results: Array<Todo>
}
