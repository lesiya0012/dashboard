export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-teal-700 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-white mb-4">{message}</h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-teal-700 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}