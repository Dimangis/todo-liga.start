import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 6 characters')
    .max(20, 'Name must not exceed 20 characters'),
  info: Yup.string()
    .required('Description is required')
    .min(6, 'Description must be at least 6 characters')
    .max(30, 'Description must not exceed 30 characters'),
  isImportant: Yup.bool(),
  isDone: Yup.bool(),
});
