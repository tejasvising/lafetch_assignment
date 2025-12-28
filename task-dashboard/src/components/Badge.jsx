export default function Badge({ status }) {
  const colors = {
    Pending: 'bg-gray-500',
    'In Progress': 'bg-yellow-500',
    Completed: 'bg-green-600'
  }

  return (
    <span className={`px-2 py-1 text-white rounded ${colors[status]}`}>
      {status}
    </span>
  )
}
