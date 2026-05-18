import { useState } from 'react';
import { uploadImage } from '../utils/cloudinaryConfig';

function AddTask({addTask, onFilterChange}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState("low");
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const secureUrl = await uploadImage(file);
            setImageUrl(secureUrl);
        } catch (error) {
            console.error('Upload failed:', error);
            alert(error.message || 'Image upload failed');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !title || !description) return;
        const newTask = {
            title,
            description,
            status: 'todo',
            priority,
            imageUrl: imageUrl || null,
        };
        addTask(newTask);
        setTitle('');
        setDescription('');
        setPriority('low');
        setImageUrl('');
    };

    const handleFilterChange = () => {
        if (onFilterChange) {
            onFilterChange({ searchTerm, priorityFilter });
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onFilterChange) {
            onFilterChange({ searchTerm: value, priorityFilter });
        }
    };

    const handlePriorityFilterChange = (e) => {
        const value = e.target.value;
        setPriorityFilter(value);
        if (onFilterChange) {
            onFilterChange({ searchTerm, priorityFilter: value });
        }
    };

    return (
        <>
            <form className = 'task-form' onSubmit={handleSubmit}>
                <input  
                    type='text'
                    placeholder='Task Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}    
                />
                <textarea 
                    placeholder='Task Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                <div className="image-upload-section">
                    <label className="image-upload-label">
                        {imageUrl ? '✓ Image Selected' : '📷 Add Task Image'}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            hidden
                            disabled={uploading}
                        />
                    </label>
                    {uploading && <p className="uploading-text">Uploading...</p>}
                    {imageUrl && (
                        <div className="image-preview">
                            <img src={imageUrl} alt="Task preview" />
                            <button 
                                type="button" 
                                onClick={() => setImageUrl('')}
                                className="remove-image-btn"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <button type='submit'>Add Task</button>
            </form>

            <div className="filter-section">
                <input  
                    type='text'
                    placeholder='Search tasks...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select 
                    value={priorityFilter} 
                    onChange={handlePriorityFilterChange}
                    className="priority-filter-select"
                >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>
            </div>
        </>
     );
    }

export default AddTask;