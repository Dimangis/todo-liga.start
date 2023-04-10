import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { useParams } from 'react-router-dom';
import { TaskAgentInstance } from 'http/index';
import { mapToInternalTaskEdit } from 'helpers/index';
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

      changeTaskImportant: action,
      changeTaskCompleted: action,
    });

    reaction(
      () => this.taskId,
      (): void => {
        this.getTask(this.taskId);
      }
    );
  }
  private _isLoading = false;
  private _taskId = '0';
  private _task: EditTaskFormEntity | null = null;
  get isLoading(): boolean {
    return this._isLoading;
  }
  get taskId(): string {
    return this._taskId;
  }
  set taskId(id) {
    this._taskId = id;
  }
  get task(): EditTaskFormEntity | null {
    return this._task;
  }
  changeTaskImportant = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    console.log('imporant', taskId, !currentStatus);
  };
  changeTaskCompleted = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    console.log('completed', taskId, !currentStatus);
  };

  getTask = async (taskId: string) => {
    const res = await TaskAgentInstance.getTask(taskId);
    console.log(mapToInternalTaskEdit(res));
    return { task: mapToInternalTaskEdit(res) };
  };
}

export const EditTaskStoreInstance = new EditTaskStore();
