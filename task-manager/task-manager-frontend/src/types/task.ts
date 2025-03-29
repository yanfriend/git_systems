export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export interface TaskFormData {
  title: string;
  description?: string;
}