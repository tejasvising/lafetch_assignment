export default function Pagination({ page, setPage, total, pageSize = 5 }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="border px-3 py-1"
      >
        Prev
      </button>

      <span>Page {page} of {totalPages}</span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="border px-3 py-1"
      >
        Next
      </button>
    </div>
  )
}
