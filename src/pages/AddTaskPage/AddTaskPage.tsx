import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, PageContainer, TextField } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { AddTask } from 'modules/AddTask';

export function AddTaskPage() {
  return <AddTask />;
}
