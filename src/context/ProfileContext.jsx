import { createContext, useState, useContext } from 'react';

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234a90e2"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cpath d="M 30 65 Q 30 55 50 55 Q 70 55 70 65 L 70 75 Q 70 85 50 85 Q 30 85 30 75 Z" fill="white"/%3E%3C/svg%3E';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: 'User',
      email: 'user@example.com',
      avatar: DEFAULT_AVATAR,
      bio: 'Task Manager Pro',
      joinDate: new Date().toLocaleDateString()
    };
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
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
