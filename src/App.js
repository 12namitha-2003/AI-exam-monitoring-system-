import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateExamPage from "./pages/CreateExamPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SystemCheck from "./pages/SystemCheck";
import ResetPassword from "./pages/ResetPassword";
import CandidateDashboard from "./components/CandidateDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminDetail from "./pages/AdminDetail";

import CandidatesPage from "./pages/CandidatesPage";
import ResultsPage from "./pages/ResultsPage";
import FeedbackPage from "./pages/FeedbackPage";

// ✅ New pages
import AptitudePage from "./pages/AptitudePage";
import CodingPage from "./pages/CodingPage";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>

        {/* ✅ Default */}
        <Route path="/" element={<Login />} />

        {/* ✅ Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ Flow */}
        <Route path="/system-check" element={<SystemCheck />} />
        <Route path="/candidate" element={<CandidateDashboard />} />

        {/* ✅ Admin */}
        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Login />}
        />

        <Route
          path="/admin/:id"
          element={role === "admin" ? <AdminDetail /> : <Login />}
        />

        {/* ✅ Exam Pages (NEW) */}
        <Route path="/aptitude" element={<AptitudePage />} />
        <Route path="/coding" element={<CodingPage />} />
        <Route path="/create-exam" element={<CreateExamPage />} />
      
<Route path="/candidates" element={<CandidatesPage />} />
<Route path="/results" element={<ResultsPage />} />
<Route path="/feedback" element={<FeedbackPage />} />

      </Routes>
    </Router>
  );
}

export default App;