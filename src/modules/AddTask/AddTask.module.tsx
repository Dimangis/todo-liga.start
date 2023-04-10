import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AddTaskStoreInstance } from './store';
import { Checkbox, PageContainer, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';

function AddTaskProto() {
  useEffect(() => {
    // AddTaskStoreInstance.updateTasks();
  }, []);

  return (
    <PageContainer>
      <h1 className="text-center">TODO | ADD TASK</h1>
      <TextField label={'Task name'} />
      <TextField label={'What to do(description)'} />
      <Checkbox label={'Important'} />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ROOT}>
        <button type="submit">Add task</button>
      </Link>
    </PageContainer>
  );
}

export const AddTask = observer(AddTaskProto);
