import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/admin/Dashboard";
import { Notfound } from "./components/Notfound";
import { TeacherDashboard } from "./components/admin/teacher/TeacherDashboard";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />

          <Route path="/not-found" element={<Notfound />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};
