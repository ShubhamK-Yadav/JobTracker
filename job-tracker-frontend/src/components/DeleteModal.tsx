import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  jobId: number;
  request: (id: number) => Promise<void>;
  onClose: () => (void);
}

export default function DeleteModal({ isOpen, jobId, request, onClose }: Props) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    await request(jobId);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400/60">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Delete Job?</h2>
        <p className="text-gray-600 text-center mb-6">
          This action cannot be undone. Are you sure you want to permanently delete this job?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
