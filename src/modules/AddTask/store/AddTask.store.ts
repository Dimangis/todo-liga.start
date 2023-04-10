import { action, computed, makeObservable, observable } from 'mobx';
import { TaskAgentInstance } from 'http/index';
import { getInternalInfo, mapToExternalParams, mapToInternalTasks } from 'helpers/index';
import { EditTaskFormEntity, TaskEntity } from 'domains/index';

// type PrivateFields = '_task' | '_isTaskLoading' | '_taskId';

export class AddTaskStore {
  constructor() {
    makeObservable<this>(this, {
      // _task: observable,
      // _isTaskLoading: observable,
      // _taskId: observable,
      // getInputValue: action,
      task: computed,
      postTask: action,
    });

    // reaction(
    //   () => this.taskId,
    //   (): void => {
    //     this.loadTask(this.taskId);
    //   }
    // );
  }
  private _isTasksLoading = false;
  get isTaskLoading(): boolean {
    return this._isTasksLoading;
  }

  get task(): TaskEditFormEntity | undefined {
    return this.task;
  }
  postTask = async (task: TaskEditFormEntity) => {
    const res = await TaskAgentInstance.createTask(task);
    console.log(res);
  };
}

export const AddTaskStoreInstance = new AddTaskStore();
