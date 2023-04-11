import { computed, makeObservable, observable, reaction, runInAction, action } from 'mobx';
import { TaskAgentInstance } from 'http/index';
import { mapToExternalTask, mapToInternalTaskEdit } from 'helpers/index';
import { EditTaskFormEntity, TaskEntity } from 'domains/index';

type PrivateFields = '_isLoading' | '_taskId' | '_task';

export class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      _taskId: observable,
      _task: observable,

      task: computed,
      taskId: computed,
      isLoading: computed,

      updateTask: action,
      getTask: action,
    });

    reaction(
      () => this.taskId,
      async (): Promise<void> => {
        this.task = await this.getTask(this.taskId);
        runInAction(() => {
          this._isLoading = false;
        });
      }
    );
  }
  private _isLoading = true;
  private _taskId = '0';
  private _task: TaskEntity | null = null;
  get isLoading(): boolean {
    return this._isLoading;
  }
  get taskId(): string {
    return this._taskId;
  }
  set taskId(id) {
    this._taskId = id;
  }
  get task(): TaskEntity | null {
    return this._task;
  }
  set task(task) {
    this._task = task;
  }
  getTask = async (taskId: string) => {
    const res = await TaskAgentInstance.getTask(taskId);
    return mapToInternalTaskEdit(res);
  };

  updateTask = async (task: EditTaskFormEntity) => {
    this._isLoading = true;
    try {
      await TaskAgentInstance.updateTask(this._taskId, mapToExternalTask(task));
    } catch {
      runInAction(() => {
        alert('ERROR');
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };
}

export const EditTaskStoreInstance = new EditTaskStore();
