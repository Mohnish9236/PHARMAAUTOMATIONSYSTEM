import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark"
        style={{ background: 'linear-gradient(135deg, rgba(45, 52, 54, 0.95), rgba(9, 132, 227, 0.95))' }}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-clinic-medical me-2"></i>PharmaCore
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <button onClick={handleLogout} className="btn btn-outline-light">
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '120px' }}>
        <h1 className="text-center mb-5" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          💊 Drug Management System
        </h1>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card text-center shadow feature-card p-3">
              <i className="fas fa-plus-circle feature-icon mb-3"
                style={{ fontSize: '2.5rem', color: '#00B894' }}></i>
              <div className="card-body">
                <h5 className="card-title">Add Drug</h5>
                <p className="card-text">Add a new drug to the inventory</p>
                <button onClick={() => navigate("/add")} className="btn btn-success w-100">Add Drug</button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card text-center shadow feature-card p-3">
              <i className="fas fa-eye feature-icon mb-3"
                style={{ fontSize: '2.5rem', color: '#00B894' }}></i>
              <div className="card-body">
                <h5 className="card-title">View Drugs</h5>
                <p className="card-text">See all available drugs</p>
                <button onClick={() => navigate("/view")} className="btn btn-primary w-100">View Drugs</button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card text-center shadow feature-card p-3">
              <i className="fas fa-trash feature-icon mb-3"
                style={{ fontSize: '2.5rem', color: '#00B894' }}></i>
              <div className="card-body">
                <h5 className="card-title">Delete Drug</h5>
                <p className="card-text">Remove a drug from inventory</p>
                <button onClick={() => navigate("/delete")} className="btn btn-danger w-100">Delete Drug</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
