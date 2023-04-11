import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditTaskStoreInstance } from '../store';
import { DEFAULT_VALUES } from './EditTaskForm.utils';
import { validationSchema } from './EditTaskForm.validation';
import { EditTaskFormEntity, TaskEntity } from 'domains/index';
import { Checkbox, Loader, TextField } from 'components/index';
import { ROOT } from 'constants/index';

function EditTaskFormProto() {
  const { isLoading, updateTask } = EditTaskStoreInstance;
  const { taskId } = useParams();
  // ATTENTION!!!
  const id = taskId as string;

  const [task, setTask] = useState<TaskEntity | null>(null);

  useEffect((): void => {
    EditTaskStoreInstance.taskId = id;
    setTask(EditTaskStoreInstance.task);
  }, [EditTaskStoreInstance.task, taskId]);

  const { control, setValue, handleSubmit, watch } = useForm<EditTaskFormEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
  });
  useEffect((): void => {
    if (task) {
      setValue('name', task.name);
      setValue('info', task.info);
      setValue('isImportant', task.isImportant);
      setValue('isDone', task.isDone);
      // reset(task);
    }
  }, [task]);

  const onTaskNameChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name', evt.target.value);
  const onTaskDescriptionChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('info', evt.target.value);
  const onTaskImportantChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isImportant', evt.target.checked);
  const onTaskCompletedChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isDone', evt.target.checked);

  const disabled = watch('isDone');
  const navigate = useNavigate();
  const onSubmit = async (data: EditTaskFormEntity) => {
    await updateTask(data);
    if (isLoading === false) {
      navigate(ROOT);
    }
  };
  return (
    <Loader isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label={'Task name'}
                value={field.value}
                placeholder="Clean room"
                onChange={onTaskNameChange}
                errorText={error?.message}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label={'What to do(description)'}
              value={field.value}
              placeholder="Clean room"
              onChange={onTaskDescriptionChange}
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox
              label={'Important'}
              disabled={disabled}
              checked={disabled ? false : field.value}
              onChange={onTaskImportantChange}
            />
          )}
        />
        <Controller
          control={control}
          name="isDone"
          render={({ field }) => (
            <Checkbox label={'Completed'} checked={field.value} onChange={onTaskCompletedChange} />
          )}
        />
        <button className="btn btn-secondary d-block ml-auto" type="submit">
          Edit task
        </button>
      </form>
    </Loader>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
