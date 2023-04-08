import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, PageContainer, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';

export function AddTaskPage() {
  return (
    <PageContainer>
      <h1 className="text-center">TODO | ADD TASK</h1>
      <TextField label={'Task name'} />
      <TextField label={'What to do(description)'} />
      <Checkbox label={'Important'} />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ROOT}>
        Add task
      </Link>
    </PageContainer>
  );
}
