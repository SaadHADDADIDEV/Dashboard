import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SidebarDashboard from "./Dashboard-Sidebar";
import VehicleDashboard from "./Vehicle-dashboard";
import CarPriceTrendChart from "./Trends";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="w-64">
          <SidebarDashboard />
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<VehicleDashboard />} />
            <Route path="/trends" element={<CarPriceTrendChart />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
