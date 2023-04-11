import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskStoreInstance } from '../store';
import { DEFAULT_VALUES } from './AddTaskForm.utils';
import { validationSchema } from './AddTaskForm.validation';
import { EditTaskFormEntity } from 'domains/index';
import { Checkbox, TextField } from 'components/index';
import { ROOT } from 'constants/index';

function AddTaskFormProto() {
  const { isLoading, createTask } = AddTaskStoreInstance;

  const { control, setValue, handleSubmit } = useForm<EditTaskFormEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
  });

  const onTaskNameChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name', evt.target.value);
  const onTaskDescriptionChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('info', evt.target.value);
  const onTaskImportantChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isImportant', evt.target.checked);

  const navigate = useNavigate();
  const onSubmit = async (data: EditTaskFormEntity) => {
    await createTask(data);
    if (isLoading === false) {
      navigate(ROOT);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label={'Task name'}
              value={field.value ? field.value : ''}
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
            value={field.value ? field.value : ''}
            placeholder="Clean room"
            onChange={onTaskDescriptionChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => <Checkbox label={'Important'} checked={field.value} onChange={onTaskImportantChange} />}
      />

      <button className="btn btn-secondary d-block ml-auto" type="submit">
        Add task
      </button>
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
