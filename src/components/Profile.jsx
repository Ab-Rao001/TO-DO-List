import { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { uploadImage } from '../utils/cloudinaryConfig';
import '../styles/Profile.css';

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234a90e2"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cpath d="M 30 65 Q 30 55 50 55 Q 70 55 70 65 L 70 75 Q 70 85 50 85 Q 30 85 30 75 Z" fill="white"/%3E%3C/svg%3E';

function Profile() {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const secureUrl = await uploadImage(file);
      const updatedProfile = {
        ...formData,
        avatar: secureUrl,
      };

      setFormData(updatedProfile);
      updateProfile(updatedProfile);
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error.message || 'Failed to upload image. Check that the server is running and Cloudinary is configured.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="profile-container">
        <div className="profile-edit">
          <h2>Edit Profile</h2>
          <div className="profile-avatar-upload">
            <img 
              src={formData.avatar} 
              alt="Avatar" 
              className="avatar-preview"
              onError={(e) => {
                console.error('Preview image failed to load:', formData.avatar);
                e.target.src = DEFAULT_AVATAR;
              }}
            />
            <label className="upload-btn">
              Change Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
            {uploading && <p className="uploading">Uploading...</p>}
          </div>
          
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="profile-input"
          />
          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="profile-input"
          />
          
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Your Bio"
            className="profile-input"
            rows="3"
          />
          
          <div className="profile-actions">
            <button onClick={handleSave} className="save-btn">Save Profile</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img 
          src={profile.avatar} 
          alt="Avatar" 
          className="profile-avatar"
          onError={(e) => {
            console.error('Image failed to load:', profile.avatar);
            e.target.src = DEFAULT_AVATAR;
          }}
        />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p className="email">{profile.email}</p>
          <p className="bio">{profile.bio}</p>
          <p className="join-date">Member since {profile.joinDate}</p>
        </div>
        <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
