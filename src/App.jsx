import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AddDrug from "./pages/AddDrug";
import ViewDrug from "./pages/ViewDrug";
import UpdateDrug from "./pages/UpdateDrug";
import DeleteDrug from "./pages/DeleteDrug";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* ✅ HOME route */}
        <Route 
          path="/" 
          element={
            isLoggedIn 
              ? <Home setIsLoggedIn={setIsLoggedIn} /> 
              : <Navigate to="/login" />
          } 
        />

        {/* ✅ Other protected routes */}
        <Route path="/add" element={isLoggedIn ? <AddDrug /> : <Navigate to="/login" />} />
        <Route path="/view" element={isLoggedIn ? <ViewDrug /> : <Navigate to="/login" />} />
        <Route path="/update" element={isLoggedIn ? <UpdateDrug /> : <Navigate to="/login" />} />
        <Route path="/delete" element={isLoggedIn ? <DeleteDrug /> : <Navigate to="/login" />} />

        {/* ✅ Public login */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
