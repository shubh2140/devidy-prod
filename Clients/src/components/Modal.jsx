import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white w-[340px] rounded-2xl p-5">
        {children}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>
      </div>
    </div>
  );
}
