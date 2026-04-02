import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";              // 👈 NEW
import Register from "./pages/Register";
import SystemCheck from "./pages/SystemCheck";
import ResetPassword from "./pages/ResetPassword";
import CandidateDashboard from "./components/CandidateDashboard";

import AdminDashboard from "./components/AdminDashboard";
import AdminDetail from "./pages/AdminDetail";

function App() {

  const role = localStorage.getItem("role");

  return (
    <Router>

      <Routes>

        {/* 👇 Default page = LOGIN */}
        <Route path="/" element={<Login />} />

        {/* 👇 New user register */}
        <Route path="/register" element={<Register />} />

        {/* 👇 Flow */}
        <Route path="/system-check" element={<SystemCheck />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* 👇 Admin */}
        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Login />}
        />

        <Route
          path="/admin/:id"
          element={role === "admin" ? <AdminDetail /> : <Login />}
        />

      </Routes>

    </Router>
  );
}

export default App;