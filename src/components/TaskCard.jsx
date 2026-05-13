function TaskCard({ task, updatestatus, deleteTask }) {
  const isCompleted = task.status === 'done';
  return (
    <div className='task-card'>
      <div className="task-header">
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) =>
            updatestatus(task._id, e.target.value)
          }
          disabled={isCompleted}
          className="status-select"
        >
          <option value='todo'>To Do</option>
          <option value='in progress'>In Progress</option>
          <option value='done'>Done</option>
        </select>

        <button 
          className='delete-btn' 
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;