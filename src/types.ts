export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
}

export interface Column {
  id: 'todo' | 'in-progress' | 'done';
  title: string;
  tasks: Task[];
}
