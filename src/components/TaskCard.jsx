import { useProfile } from '../context/ProfileContext';

function TaskCard({ task, updatestatus, deleteTask }) {
  const { profile } = useProfile();
  const isCompleted = task.status === 'done';
  
  return (
    <div className='task-card'>
      <div className="task-header">
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
        <div className="task-profile">
          <img src={profile.avatar} alt="Profile" className="task-profile-avatar" />
          <span className="task-profile-name">{profile.name}</span>
        </div>
      </div>

      {task.imageUrl && (
        <div className="task-image">
          <img
            src={task.imageUrl}
            alt={task.title}
            className="task-picture"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

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