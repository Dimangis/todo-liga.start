import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Checkbox, PageContainer, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';

export function EditPage() {
  const { taskId } = useParams();

  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | EDIT TASK {taskId}</h1>
      <TextField label={'Task name'} />
      <TextField label={'What to do(description)'} />
      <Checkbox label={'Important'} />
      <Checkbox label={'Completed'} />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ROOT}>
        Edit task
      </Link>
    </PageContainer>
  );
}
