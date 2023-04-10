import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { EditTaskForm } from './components';
import { PageContainer } from 'components/index';

function EditTaskProto() {
  const { taskId } = useParams();

  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | EDIT TASK {taskId}</h1>
      <EditTaskForm />
    </PageContainer>
  );
}

export const EditTask = observer(EditTaskProto);
