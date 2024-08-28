import React from "react";

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
      <div className="flex items-center">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
