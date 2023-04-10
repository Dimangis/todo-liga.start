export interface EditTaskFormEntity {
  name: string;
  info: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface PushTaskFormEntity {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}
