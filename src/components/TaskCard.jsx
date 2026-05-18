import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { uploadImage } from '../utils/cloudinaryConfig';

function TaskCard({ task, updatestatus, deleteTask, updateTask }) {
  const { profile } = useProfile();
  const isCompleted = task.status === 'done';
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const secureUrl = await uploadImage(file);
      updateTask(task._id, { imageUrl: secureUrl });
      setShowModal(false);
      setShowMenu(false);
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = () => {
    updateTask(task._id, { imageUrl: null });
    setShowModal(false);
    setShowMenu(false);
  };

  const handleViewPhoto = () => {
    setShowModal(true);
    setShowMenu(false);
  };
  
  return (
    <div className='task-card'>
      <div className="task-header">
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="task-profile">
            <img src={profile.avatar} alt="Profile" className="task-profile-avatar" />
            <span className="task-profile-name">{profile.name}</span>
          </div>
          <div className="menu-container">
            <button 
              className="menu-trigger"
              onClick={() => setShowMenu(!showMenu)}
            >
              ⋮
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                {task.imageUrl ? (
                  <>
                    <button onClick={handleViewPhoto} className="menu-item">
                      View Photo
                    </button>
                    <button onClick={() => { setShowModal(true); setShowMenu(false); }} className="menu-item">
                      Update Photo
                    </button>
                    <button onClick={handleDeletePhoto} className="menu-item delete-option">
                      Delete Photo
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setShowModal(true); setShowMenu(false); }} className="menu-item">
                    Add Photo
                  </button>
                )}
                <button onClick={() => setShowMenu(false)} className="menu-item back-option">
                  Back
                </button>
              </div>
            )}
          </div>
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

      {/* Photo Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            
            {task.imageUrl ? (
              <div className="modal-view-photo">
                <img src={task.imageUrl} alt={task.title} />
                <div className="modal-actions">
                  <label className="modal-btn upload-btn">
                    {uploading ? 'Uploading...' : 'Update Photo'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      hidden
                      disabled={uploading}
                    />
                  </label>
                  <button className="modal-btn delete-btn" onClick={handleDeletePhoto}>
                    Delete Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-add-photo">
                <p>Add a photo to this task</p>
                <label className="modal-btn upload-btn">
                  {uploading ? 'Uploading...' : 'Select Photo'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    hidden
                    disabled={uploading}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;