import React from 'react';
import { observer } from 'mobx-react';
import { TasksStoreInstance } from '../../store';
import { Loader } from 'components/index';
import './TasksStats.css';

function TasksStatsProto() {
  const { isTasksLoading, tasksStats } = TasksStoreInstance;

  return (
    <div className="d-flex w-100 justify-content-between margin-b">
      {tasksStats ? (
        <>
          <span>
            Total:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{tasksStats.total}</span>
            </Loader>
          </span>
          <span>
            Important:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{tasksStats.important}</span>
            </Loader>
          </span>
          <span>
            Done:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{tasksStats.done}</span>
            </Loader>
          </span>
        </>
      ) : (
        <p className="d-flex justify-content-center w-100">Stats is not available</p>
      )}
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);
