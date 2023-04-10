import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Checkbox, PageContainer, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { EditTask } from 'modules/EditTask';

export function EditPage() {
  const { taskId } = useParams();

  return <EditTask />;
}
