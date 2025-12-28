import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const onLogout = () => {
    setOpen(false)
    logout()
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile top navbar */}
      <header className="bg-gray-800 text-white p-4 md:hidden flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(o => !o)} className="p-2">
            ☰
          </button>
          <div className="font-bold">Task Dashboard</div>
        </div>
        <div>{user?.name || 'Guest'}</div>
      </header>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-gray-700 text-white p-4 space-y-2">
          {/* <Link to="/tasks" onClick={() => setOpen(false)} className="block">Tasks</Link> */}
          {user?.role === 'admin' && (
            <>
              <Link to="/create" onClick={() => setOpen(false)} className="block">Create Task</Link>
              {location.pathname === '/create' && (
                <Link to="/tasks" onClick={() => setOpen(false)} className="block">Back to Tasks</Link>
              )}
            </>
          )}
          <button onClick={() => { setOpen(false); logout() }} className="block text-left">Logout</button>
        </nav>
      )}

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-gray-800 text-white p-4">
        <p className="mb-4">Welcome, {user?.name || 'Guest'}</p>
        <nav className="space-y-3">
          {/* <Link to="/tasks">Tasks</Link> */}
          {user?.role === 'admin' && (
            <>
              <Link to="/create">Create Task</Link>
              {location.pathname === '/create' && (
                <Link to="/tasks" className="block">Back to Tasks</Link>
              )}
            </>
          )}
          <button onClick={onLogout} className="block text-left">Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
