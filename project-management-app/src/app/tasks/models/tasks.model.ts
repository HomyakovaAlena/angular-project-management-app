export interface Column {
  _id?: string;
  title: string;
  order: number;
  boardId: string;
}

export interface Task {
  _id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}

export interface Point {
  _id?: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}
