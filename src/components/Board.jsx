import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import TaskCard from './TaskCard';
function Board() {
  const [tasks, setTasks] = useState([]);
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
  const handleDragStart = (e, task) => {

    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData(
      'taskId',
      task._id
    );
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
                .filter((task) =>
                  task.status === column.label
                )

                .map((task) => (

                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, task)
                    }
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