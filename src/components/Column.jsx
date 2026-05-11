import TaskCard from './TaskCard';

function Column({title, status, tasks, updateStatus}){
  return(
    <div className = 'column'>
      <h2>{title}</h2>

      {tasks.filter((task) => task.status === status).map((task) => (
        <TaskCard key={task.id} task={task} updatestatus={updateStatus} />
      ))}
      </div>
  );
}

export default Column;