import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: 'User',
    email: 'user@example.com',
    avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234a90e2"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cpath d="M 30 65 Q 30 55 50 55 Q 70 55 70 65 L 70 75 Q 70 85 50 85 Q 30 85 30 75 Z" fill="white"/%3E%3C/svg%3E',
    bio: 'Task Manager Pro',
    joinDate: new Date().toLocaleDateString()
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Keep default profile if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (newProfile) => {
    try {
      const response = await axios.put('http://localhost:5000/profile', newProfile);
      setProfile(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
