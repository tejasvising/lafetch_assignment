import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTasks } from '../api/tasks'
import { useState, useEffect } from 'react'
import TaskDetails from './TaskDetails'
import Badge from '../components/Badge'
import Pagination from '../components/Pagination'

export default function Tasks() {
  const qc = useQueryClient()
  const { data = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    setPage(1)
  }, [search, status])

  const pageSize = 5
  const filtered = data.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (status === 'All' || t.status === status)
  )

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Search by title"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="grid gap-4">
        {paginated.length === 0 ? (
          <p>No tasks found</p>
        ) : paginated.map(task => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="border p-4 cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description?.slice(0, 50)}...</p>
            <Badge status={task.status} />
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        total={filtered.length}
      />

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null)
            qc.invalidateQueries(['tasks'])
          }}
        />
      )}
    </div>
  )
}
