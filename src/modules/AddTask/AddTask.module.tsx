import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { AddTaskForm } from './components';
import { PageContainer } from 'components/index';

function AddTaskProto() {
  useEffect(() => {
    // AddTaskStoreInstance.updateTasks();
  }, []);

  return (
    <PageContainer>
      <h1 className="text-center">TODO | ADD TASK</h1>
      <AddTaskForm />
    </PageContainer>
  );
}

export const AddTask = observer(AddTaskProto);
