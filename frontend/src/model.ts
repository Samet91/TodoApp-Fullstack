export interface TodoProps {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  onItemChange: () => void;
}

export interface Response {
    results: Array<TodoProps>
}
