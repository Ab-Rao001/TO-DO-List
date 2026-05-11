import {useState} from 'react';
import AddTask from './AddTask';
import TaskCard from './TaskCard';
import tasksData from "../data/tasks.json";

function Board() {
  const [tasks, setTasks] = useState(tasksData);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateStatus = (id, newStatus) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    updateStatus(taskId, status);
  };

  const columns = [
    { id: 'todo', title: 'To Do', label: 'todo' },
    { id: 'in-progress', title: 'In Progress', label: 'in progress' },
    { id: 'done', title: 'Done', label: 'done' }
  ];

  return (
    <>
    <AddTask addTask={addTask} />

    <div className='board'>
      {columns.map((column) => (
        <div
          key={column.id}
          className='column'
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.label)}
        >
          <h2>{column.title}</h2>
          <div className='tasks-container'>
            {tasks
              .filter((task) => task.status === column.label)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <TaskCard
                    task={task}
                    updatestatus={updateStatus}
                    deleteTask={deleteTask}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Board;