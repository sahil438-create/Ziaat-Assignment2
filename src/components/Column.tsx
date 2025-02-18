import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: string;
  status: any;
  tasks: Task[];
  onEditTask: any;
  onDeleteTask: any;
  onMoveTask: any;
}

export function Column({
  title,
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}: ColumnProps) {
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onMoveTask(taskId, status);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className='column'>
      <h2 className='column-title'>{title}</h2>
      <div className='task-list'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
