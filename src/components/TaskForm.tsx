import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  task?: Task;
  onSubmit: any;
  onClose: any;
}

export function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<any>(task?.status || 'todo');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    onClose();
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2 className='modal-title'>{task ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className='btn btn-icon'>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-input'
              required
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='form-textarea'
              rows={3}
              required
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              className='form-select'
            >
              <option value='todo'>To Do</option>
              <option value='in-progress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>
            {task ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
