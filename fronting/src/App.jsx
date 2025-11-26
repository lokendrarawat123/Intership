import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/admin/Dashboard";
import { Notfound } from "./components/Notfound";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not-found" element={<Notfound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};
