import { Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: any;
  onDelete: any;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div draggable onDragStart={handleDragStart} className='task-card'>
      <div className='task-header'>
        <h3 className='task-title'>{task.title}</h3>
        <div className='task-actions'>
          <button onClick={() => onEdit(task)} className='btn btn-icon'>
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} className='btn btn-icon'>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className='task-description'>{task.description}</p>
      <div className='task-date'>
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
