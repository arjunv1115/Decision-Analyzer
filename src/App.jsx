import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Decisions from "./pages/Decisions";
import AddDecision from "./pages/AddDecision";
import DecisionDetails from "./pages/DecisionDetails";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/decisions" element={<Decisions />} />
        <Route path="/decisions/new" element={<AddDecision />} />
        <Route path="/decisions/:id" element={<DecisionDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;