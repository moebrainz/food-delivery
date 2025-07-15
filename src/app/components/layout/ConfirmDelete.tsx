import { Trash2 } from "lucide-react";
import { useState } from "react";

const ConfirmDelete = ({ onDelete }: { onDelete: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed flex bg-black/80 inset-0 justify-center items-center h-screen overflow-y-hidden">
        <div className="bg-white rounded-lg p-4">
          <div>Are you sure you want to delete this item</div>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="bg-white"
              onClick={() => {
                setShowConfirm(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="gap-2 mt-4 w-full"
        onClick={() => setShowConfirm(true)}
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    </div>
  );
};

export default ConfirmDelete;
