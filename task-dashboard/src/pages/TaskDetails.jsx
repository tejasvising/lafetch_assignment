import Modal from '../components/Modal'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { updateTask } from '../api/tasks'
import { getUsers } from '../api/users'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function TaskDetails({ task, onClose }) {
  const { user } = useAuth()
  const { register, handleSubmit, reset } = useForm({ defaultValues: task })

  useEffect(() => {
    reset(task)
  }, [task, reset])

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: user?.role === 'admin'
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: updateTask,
    onSuccess: onClose
  })

  const onSubmit = (data) => {
    mutate({ id: task.id, payload: data })
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl mb-4">Task Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {user?.role === 'admin' ? (
          <>
            <input {...register('title', { required: true })} className="input" />
            <textarea {...register('description')} className="input" />
            <select {...register('assignedUser')} className="input">
              <option value="">Unassigned</option>
              {users.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </>
        ) : (
          <div>
            <p className="font-semibold">{task.title}</p>
            <p>{task.description}</p>
            <p>Assigned: {task.assignedUser || 'Unassigned'}</p>
          </div>
        )}

        <select {...register('status')} className="input">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <div className="flex gap-2">
          <button className="btn" disabled={isLoading}>Save</button>
          <button type="button" onClick={onClose} className="btn bg-gray-200">Cancel</button>
        </div>
      </form>
    </Modal>
  )
}
