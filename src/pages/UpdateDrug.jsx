import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateDrug() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [drug, setDrug] = useState({
    name: "",
    description: "",
    price: "",
    supplierName: "",
    totalQuantity: ""
  });

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/pas/${id}`);
        setDrug(res.data);
      } catch (err) {
        console.error("Error fetching drug:", err);
        alert("Failed to load drug details");
      }
    };

    fetchDrug();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrug((prev) => ({ ...prev, [name]: value }));
  };

  const updateDrug = async () => {
    try {
      await axios.put(`http://localhost:8080/pas/${id}`, drug);
      alert("Drug updated successfully");
      navigate("/view");
    } catch (err) {
      console.error("Error updating drug:", err);
      alert("Failed to update drug");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Update Drug</h1>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" value={drug.name} onChange={handleChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea name="description" value={drug.description} onChange={handleChange} className="form-control" rows="3" />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" name="price" value={drug.price} onChange={handleChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Supplier Name</label>
        <input type="text" name="supplierName" value={drug.supplierName} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Total Quantity</label>
        <input type="number" name="totalQuantity" value={drug.totalQuantity} onChange={handleChange} className="form-control" required />
      </div>
      <button onClick={updateDrug} className="btn btn-primary">Update Drug</button>
    </div>
  );
}

export default UpdateDrug;
