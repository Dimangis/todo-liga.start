import { TaskEntity, TasksStatsEntity } from 'domains/index';

export const TasksStatsMock: TasksStatsEntity = {
  total: 5,
  important: 4,
  done: 10,
};

export const TasksMock: TaskEntity[] = [
  {
    name: 'Wash',
    id: '222',
    info: 'Lorem ipsum ',
    isImportant: false,
    isDone: true,
  },
  {
    name: 'Clean',
    id: '666',
    info: 'Lorem ipsum ',
    isImportant: true,
    isDone: false,
  },
  {
    name: 'Watch',
    id: '444',
    info: 'Lorem ipsum ',
    isImportant: true,
    isDone: false,
  },
  {
    name: 'Make',
    id: '111',
    info: 'Lorem ipsum ',
    isImportant: false,
    isDone: false,
  },
];
