export interface Task {
  id: string;
  title: string;
  order: number;
}

export interface Column {
  id: string;
  name: string;
  order: number;
  tasks: Task[];
}

export interface GetColumnsData {
  columns: Column[];
}
