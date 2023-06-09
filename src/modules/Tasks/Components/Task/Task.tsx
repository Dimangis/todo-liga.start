import { Link } from 'react-router-dom';
import './Task.css';
import { TaskProps } from './Task.types';
import { EDIT, ROOT } from 'constants/index';

export function Task({ task, changeTaskImportance, deleteTask, changeTaskComplete }: TaskProps) {
  const { name, info, isImportant, isDone, id } = task;

  const onBtnImportantClick = () => changeTaskImportance(id, isImportant);

  const onBtnDeleteClick = () => deleteTask(id);

  const onBtnCompleteClick = () => changeTaskComplete(id, isDone);

  return (
    <div>
      <div className="task mb-2">
        <span
          className={`task__label ${isDone ? 'text-decoration-line-through text-secondary' : ''} ${
            isImportant ? 'text-success fw-bold' : ''
          }`}>
          {name}
        </span>

        <div className="task__btns">
          <button
            type="button"
            className={`task__btn btn ${
              isImportant ? 'btn-success' : 'btn-outline-success'
            } btn-sm float-right btn-important`}
            disabled={isDone}
            onClick={onBtnImportantClick}>
            <i className="fa fa-exclamation" />
          </button>

          <button
            type="button"
            className={`task__btn btn ${isDone ? 'btn-danger' : 'btn-outline-danger'} btn-sm float-right`}
            onClick={onBtnCompleteClick}>
            <i className="fa fa-check" />
          </button>

          <button
            type="button"
            className="task__btn btn btn-outline-danger btn-sm float-right btn-delete"
            onClick={onBtnDeleteClick}>
            <i className="fa fa-trash-o" />
          </button>

          {/* TODO: Исправить ссылку, когда будет страница редактирования */}
          <Link className="task__btn btn btn-outline-secondary btn-sm float-right" to={`${ROOT}${EDIT}/${id}`}>
            <i className="fa fa-pencil" />
          </Link>
        </div>
      </div>
      <span
        className={`${isDone ? 'text-decoration-line-through text-secondary' : ''} ${
          isImportant ? 'text-success fw-bold' : ''
        }`}>
        {info}
      </span>
    </div>
  );
}
