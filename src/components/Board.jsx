import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import TaskCard from './TaskCard';

function Board() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/tasks'
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (newTask) => {
    try {
      await axios.post(
        'http://localhost:5000/tasks',
        newTask
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/tasks/${id}`,
        {
          status: newStatus
        }
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await axios.put(
        `http://localhost:5000/tasks/${id}`,
        updates
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/tasks/${id}`
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (filters) => {
    setSearchTerm(filters.searchTerm || '');
    setPriorityFilter(filters.priorityFilter || 'all');
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task._id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    updateStatus(taskId, status);
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    // Sort by priority (high at top, low at bottom)
    filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return filtered;
  };

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      label: 'todo'
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      label: 'in progress'
    },
    {
      id: 'done',
      title: 'Done',
      label: 'done'
    }
  ];

  const filteredAndSortedTasks = getFilteredAndSortedTasks();

  return (
    <>
      <AddTask addTask={addTask} onFilterChange={handleFilterChange} />

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
              {filteredAndSortedTasks
                .filter((task) => task.status === column.label)
                .map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <TaskCard
                      task={task}
                      updatestatus={updateStatus}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
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