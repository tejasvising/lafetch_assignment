import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import DashboardLayout from './layouts/DashboardLayout'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { token, user } = useAuth()

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <Route element={<DashboardLayout />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/create" element={user?.role === 'admin' ? <CreateTask /> : <Navigate to="/tasks" />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Route>
      )}
    </Routes>
  )
}
