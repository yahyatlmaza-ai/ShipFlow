import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import '../styles/layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
