import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EditTaskStoreInstance } from './store/EditTask.store';
import { EditTaskForm } from './components';
import { Checkbox, PageContainer, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { TasksMock } from '__mocks__/Tasks.mock';
import { TaskEntity } from 'domains/Task.entity';

function EditTaskProto() {
  // const { isLoading, getTask } = EditTaskStoreInstance;
  const { taskId } = useParams();
  // // ATTENTION!!!
  // const id = taskId as string;
  // useEffect((): void => {
  //   EditTaskStoreInstance.taskId = id;
  // }, [EditTaskStoreInstance, taskId]);
  // const task = EditTaskStoreInstance.task;

  // const { editTask, isTasksLoading, task } = EditTaskStoreInstance;

  // const { control, setValue, handleSubmit } = useForm<EditFormEntity>({
  //   defaultValues: DEFAULT_VALUES,
  //   resolver: yupResolver(VALIDATION_SCHEMA),
  // });
  // const [taskNameInputValue, setTaskNameInputValue] = useState<string>('AAA');
  // const { defaultValue, setValue } = useState<string>('');
  // const onInputTaskName = (value: string) => {
  //   setTaskNameInputValue(value);
  // };
  // useEffect((): void => {
  //   if (task) {
  //     console.log('BBBB');
  //     onInputTaskName(task.name);
  //     console.log('BBBB');
  //   }
  // }, [task]);

  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | EDIT TASK {taskId}</h1>
      <EditTaskForm />
    </PageContainer>
  );
}

export const EditTask = observer(EditTaskProto);
