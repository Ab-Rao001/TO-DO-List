import { useState, useEffect } from 'react';
import Board from "./components/Board";
import Profile from "./components/Profile";
import { ProfileProvider } from "./context/ProfileContext";
import "./index.css";

function AppContent() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='app'>
      <header className="app-header">
        <h1 className='main-title'>My Task Board</h1>
        <div className="header-actions">
          <button onClick={() => setShowProfile(!showProfile)} className="profile-toggle">
            👤 Profile
          </button>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </header>
      
      {showProfile && <Profile />}
      
      <Board />
    </div>
  );
}

function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
}

export default App;