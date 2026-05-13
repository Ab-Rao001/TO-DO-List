import {useState} from 'react';
function AddTask({addTask}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState("low");
    const handleSubmit = (e) => {
        e.preventDefault();
        if( !title || !description) return;
        const newTask = {
            id: Date.now(),
            title,
            description,
            status: 'todo',
            priority
        };
        addTask(newTask);
        setTitle('');
        setDescription('');
        setPriority('low');
    };
    return (
        <form className = 'task-form' onSubmit={handleSubmit}>
            <input  type='text'
            placeholder='Task Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}    
            />
            <textarea placeholder='Task Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}

            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <button type='submit'>Add Task</button>
        </form>
     );
    }

export default AddTask;