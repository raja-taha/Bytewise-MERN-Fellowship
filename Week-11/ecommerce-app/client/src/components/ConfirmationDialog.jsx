import React from "react";
import Button from "./Button";

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-button bg-opacity-50">
      <div className="bg-text p-6 rounded shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
          >
            <Button text={"Cancel"} />
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            <Button text={"Confirm"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
