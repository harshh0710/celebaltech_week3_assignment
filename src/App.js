// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import SuccessPage from "./SuccessPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/submitted" element={<SuccessPage />} />
    </Routes>
  );
}
