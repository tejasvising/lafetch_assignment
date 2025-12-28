export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 w-full max-w-lg rounded">
        <button
          onClick={onClose}
          className="float-right text-red-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
