import { Link, useParams } from 'react-router-dom';
import React, { useEffect, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// import { reset } from 'cypress/types/sinon';
import { EditTaskStoreInstance } from '../store';
import { DEFAULT_VALUES } from './EditTaskForm.utils';
import { EditTaskFormEntity } from 'domains/index';
import { Checkbox, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';

function EditTaskFormProto() {
  const { isLoading, getTask } = EditTaskStoreInstance;
  const { taskId } = useParams();
  // ATTENTION!!!
  const id = taskId as string;
  useEffect((): void => {
    EditTaskStoreInstance.taskId = id;
  }, [EditTaskStoreInstance, taskId]);
  const task = EditTaskStoreInstance.task;

  // const { editTask, isTasksLoading, task } = EditTaskStoreInstance;

  const validationSchema = Yup.object().shape({
    taskName: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    taskDescription: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    isImportant: Yup.bool().required('You must accept terms').oneOf([true], 'Accept Terms is required'),
    isDone: Yup.bool(),
  });

  const { control, setValue } = useForm<EditTaskFormEntity>({
    defaultValues: DEFAULT_VALUES,
    // resolver: yupResolver(validationSchema),
  });
  // const [taskNameInputValue, setTaskNameInputValue] = useState<string>('AAA');
  // const { defaultValue, setValue } = useState<string>('');
  // const onInputTaskName = (value: string) => {
  //   setTaskNameInputValue(value);
  // };
  useEffect((): void => {
    if (task) {
      setValue('taskName', task.taskName);
      setValue('taskDescription', task.taskDescription);
      setValue('isImportant', task.isImportant);
      setValue('isDone', task.isDone);
      // reset(task);
    }
  }, [task]);

  const onTaskNameChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('username', evt.target.value);
  const onTaskDescriptionChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('password', evt.target.value);
  const onTaskImportantChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('acceptTerms', evt.target.checked);

  return (
    <form>
      <Controller
        control={control}
        name="taskName"
        render={({ field }) => <TextField label={'Task name'} value={field.value} placeholder="Clean room" />}
      />
      <Controller
        control={control}
        name="taskDescription"
        render={({ field }) => (
          <TextField label={'What to do(description)'} value={field.value} placeholder="Clean room" />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => <Checkbox label={'Important'} checked={field.value} />}
      />
      <Controller
        control={control}
        name="isDone"
        render={({ field }) => <Checkbox label={'Completed'} checked={field.value} />}
      />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ROOT}>
        Edit task
      </Link>
    </form>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
