import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ViewDrug() {
  const [drugs, setDrugs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    supplierName: "",
    totalQuantity: ""
  });

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pas/all");
      setDrugs(res.data);
    } catch (err) {
      console.error("Error fetching drugs:", err);
    }
  };

  const deleteDrug = async (id) => {
    if (!window.confirm("Are you sure you want to delete this drug?")) return;

    try {
      await axios.delete(`http://localhost:8080/pas/${id}`);
      alert("Drug deleted successfully");
      fetchDrugs();
    } catch (err) {
      console.error("Error deleting drug:", err);
      alert("Failed to delete drug");
    }
  };

  const startEdit = (drug) => {
    setEditId(drug.id);
    setEditData({
      name: drug.name,
      description: drug.description,
      price: drug.price,
      supplierName: drug.supplierName,
      totalQuantity: drug.totalQuantity
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({
      name: "",
      description: "",
      price: "",
      supplierName: "",
      totalQuantity: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const updateDrug = async (id) => {
    if (!window.confirm("Are you sure you want to update this drug?")) return;

    try {
      await axios.put(`http://localhost:8080/pas/${id}`, editData);
      alert("Drug updated successfully");
      setEditId(null);
      fetchDrugs();
    } catch (err) {
      console.error("Error updating drug:", err);
      alert("Failed to update drug");
    }
  };

  return (
    <center>

   
  <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh", paddingTop: "60px", paddingBottom: "40px" }}>
    <div className="container-fluid px-9">
      <h1 className="mb-5 text-center fw-bold" style={{ color: "#0984e3", fontFamily: "Playfair Display, serif", fontSize: "2.5rem" }}>
        <i className="fas fa-pills me-2"></i>Drug Inventory
      </h1>

      {drugs.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {drugs.map((drug) => (
            <div key={drug.id} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  {editId === drug.id ? (
                    <>
                      <input type="text" name="name" value={editData.name} onChange={handleChange} className="form-control mb-2" placeholder="Name" />
                      <textarea name="description" value={editData.description} onChange={handleChange} className="form-control mb-2" placeholder="Description" />
                      <input type="number" name="price" value={editData.price} onChange={handleChange} className="form-control mb-2" placeholder="Price" />
                      <input type="text" name="supplierName" value={editData.supplierName} onChange={handleChange} className="form-control mb-2" placeholder="Supplier Name" />
                      <input type="number" name="totalQuantity" value={editData.totalQuantity} onChange={handleChange} className="form-control mb-2" placeholder="Total Quantity" />
                    </>
                  ) : (
                    <>
                      <h5 className="card-title text-primary fw-bold">{drug.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{drug.description}</h6>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{drug.price}<br />
                        <strong>Supplier:</strong> {drug.supplierName}<br />
                        <strong>Quantity:</strong> {drug.totalQuantity}
                      </p>
                    </>
                  )}
                </div>
                <div className="card-footer bg-white border-0 d-grid gap-2">
                  {editId === drug.id ? (
                    <>
                      <button onClick={() => updateDrug(drug.id)} className="btn btn-success">
                        <i className="fas fa-save me-2"></i>Save
                      </button>
                      <button onClick={cancelEdit} className="btn btn-secondary">
                        <i className="fas fa-times me-2"></i>Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(drug)} className="btn btn-warning">
                        <i className="fas fa-edit me-2"></i>Edit
                      </button>
                      <button onClick={() => deleteDrug(drug.id)} className="btn btn-danger">
                        <i className="fas fa-trash me-2"></i>Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center fs-5">No drugs available.</p>
      )}
    </div>
  </div>
   </center>
);

}

export default ViewDrug;
