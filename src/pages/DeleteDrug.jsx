import React, { useState } from "react";
import axios from "axios";

function DeleteDrug() {
  const [id, setId] = useState("");

  const deleteDrug = async () => {
    try {
      await axios.delete(`http://localhost:8080/pas/${id}`);
      alert("Drug deleted successfully");
    } catch (err) {
      console.error("Error deleting drug:", err);
      alert("Failed to delete drug");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Delete Drug</h1>
      <div className="mb-3">
        <label className="form-label">Drug ID</label>
        <input type="number" className="form-control" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <button onClick={deleteDrug} className="btn btn-danger">Delete Drug</button>
    </div>
  );
}

export default DeleteDrug;
