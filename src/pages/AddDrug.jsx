import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddDrug() {
  const [drug, setDrug] = useState({
    name: "",
    description: "",
    price: "",
    supplierName: "",
    totalQuantity: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrug((prev) => ({ ...prev, [name]: value }));
  };

  const addDrug = async () => {
    try {
      await axios.post("http://localhost:8080/pas/addDrugs", drug);
      alert("Drug added successfully");
      setDrug({
        name: "",
        description: "",
        price: "",
        supplierName: "",
        totalQuantity: ""
      });
    } catch (err) {
      console.error("Error adding drug:", err);
      alert("Failed to add drug");
    }
  };

  return (
    <div className="container mt-5" >
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4>Add New Drug</h4>
        </div>
        <div className="card-body">
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
          <button onClick={addDrug} className="btn btn-success">Add Drug</button>
        </div>
      </div>
    </div>
  );
}

export default AddDrug;
