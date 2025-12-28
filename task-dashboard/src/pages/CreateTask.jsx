import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTask } from '../api/tasks'
import { getUsers } from '../api/users'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function CreateTask() {
  const { register, handleSubmit, reset } = useForm()
  const qc = useQueryClient()
  const { user } = useAuth()

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: user?.role === 'admin'
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries(['tasks'])
      reset()
    }
  })

  if (user?.role !== 'admin') return <p>Unauthorized</p>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Create Task</h2>
        {/* <Link to="/tasks" className="text-sm underline">Back to Tasks</Link> */}
      </div>

      <form onSubmit={handleSubmit(mutate)} className="max-w-md space-y-3">
        <input {...register('title', { required: true })} placeholder="Title" className="input" />
        <textarea {...register('description', { required: true })} placeholder="Description" className="input" />
        <select {...register('assignedUser')} className="input">
          <option value="">Unassigned</option>
          {users.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>
        <select {...register('status')} className="input">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        {error && <p className="text-red-500">Error creating task</p>}
        <div className="flex gap-2">
          <button className="btn" disabled={isLoading}>Create Task</button>
          <Link to="/tasks" className="btn bg-gray-200">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
