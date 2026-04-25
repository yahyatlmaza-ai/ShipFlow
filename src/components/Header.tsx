import { Bell, Moon, Sun, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/header.css'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Welcome to Auto Flow</h1>
        </div>

        <div className="header-actions">
          <button className="action-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          <button className="action-btn theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="action-btn profile-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
