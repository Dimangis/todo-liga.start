import { computed, makeObservable, observable, action, runInAction } from 'mobx';
import { TaskAgentInstance } from 'http/index';
import { mapToExternalTask } from 'helpers/index';
import { EditTaskFormEntity, TaskEntity } from 'domains/index';

type PrivateFields = '_isLoading' | '_task';

export class AddTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _task: observable,

      task: computed,
      isLoading: computed,

      createTask: action,
    });
  }
  private _isLoading = false;
  private _task: TaskEntity | null = null;
  get isLoading(): boolean {
    return this._isLoading;
  }
  get task(): TaskEntity | null {
    return this._task;
  }

  createTask = async (task: EditTaskFormEntity) => {
    this._isLoading = true;
    try {
      await TaskAgentInstance.createTask(mapToExternalTask(task));
    } catch {
      alert('ERROR');
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };
}

export const AddTaskStoreInstance = new AddTaskStore();
