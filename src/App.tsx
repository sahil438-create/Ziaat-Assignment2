import { useState, useEffect } from 'react';
import { Plus, Moon, Sun } from 'lucide-react';
import { Column } from './components/Column';
import { TaskForm } from './components/TaskForm';
import { Task } from './types';

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('dark_mode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = (taskData: any) => {
    const newTask: any = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, updates: any) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId: string, newStatus: any) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = (taskData: any) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    closeTaskForm();
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className='header'>
        <div className='header-content'>
          <h1 className='header-title'>Kanban Board</h1>
          <div className='header-actions'>
            <button
              onClick={() => setShowTaskForm(true)}
              className='btn btn-primary'
            >
              <Plus size={20} />
              Add Task
            </button>
            <button onClick={toggleDarkMode} className='btn btn-icon'>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className='main-content'>
        <div className='columns-container'>
          {COLUMNS.map((column: any, index: any) => (
            <Column
              key={index}
              title={column.title}
              status={column.id}
              tasks={tasks.filter((task) => task.status === column.id)}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
              onMoveTask={moveTask}
            />
          ))}
        </div>
      </main>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onClose={closeTaskForm}
        />
      )}
    </div>
  );
}

export default App;
