import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data found. Please submit the form first.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Form Submitted Successfully 🎉</h2>
      <ul className="space-y-2">
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-gray-500 text-white px-3 py-2 rounded"
      >
        Back to Form
      </button>
    </div>
  );
}
