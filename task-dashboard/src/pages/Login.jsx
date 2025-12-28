import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState(null)

  const { mutate, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data)
      navigate('/tasks')
    },
    onError: (err) => {
      setFormError(err.message || 'Login failed')
    }
  })

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(mutate)} className="border p-6 w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input {...register('email', { required: true })} className="input" placeholder="Email" />
        <input {...register('password', { required: true })} type="password" className="input" placeholder="Password" />
        {formError && <p className="text-red-500">{formError}</p>}
        <button className="btn" disabled={isLoading}>Login</button>
      </form>
    </div>
  )
}
