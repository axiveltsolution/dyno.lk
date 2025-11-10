import "./App.css";
import "./styles.css"; // spare-parts styles (optional; move into App.css if you prefer)
import { Routes, Route } from "react-router-dom";

import ContactUs from "./Pages/Public/ContactUs/ContactUs";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";

import PrivateRoute from "./Routes/PrivateRoute";

// Spare parts public pages (place these under Pages/Public/SpareParts/)
import BikeList from "./Pages/Public/SpareParts/BikeList";
import BikePage from "./Pages/Public/SpareParts/BikePage";
import PartPage from "./Pages/Public/SpareParts/PartPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<BikeList />} />
        <Route path="/spares" element={<BikeList />} />
        <Route path="/bike/:slug" element={<BikePage />} />
        <Route path="/bike/:bikeSlug/part/:partSlug" element={<PartPage />} />

        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* PROTECTED */}
        <Route
          path="/admin/*"
          element={<PrivateRoute component={AdminLayout} />}
        />

        {/* 404 */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
