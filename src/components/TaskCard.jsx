function TaskCard({task, updatestatus, deleteTask}) {
  const isCompleted = task.status === 'done';
  return (
    <div className='task-card'>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className='task-status'>{task.status}</span>
      <select 
        value={task.status} 
        onChange={(e) => updatestatus(task.id, e.target.value)}
        disabled={isCompleted}
      >
        <option value='todo'>To Do</option>
        <option value='in progress'>In Progress</option>
        <option value='done'>Done</option>
      </select>
      <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TaskCard;