// src/App.jsx
import "./App.css";
import "./styles.css";
import { Routes, Route } from "react-router-dom";

import ContactUs from "./Pages/Public/ContactUs/ContactUs";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";
import PrivateRoute from "./Routes/PrivateRoute";

// Spare Parts Pages
import BikeList from "./Pages/Public/SpareParts/BikeList";
import BikePage from "./Pages/Public/SpareParts/BikePage";
import PartPage from "./Pages/Public/SpareParts/PartPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* PUBLIC SPARE PARTS */}
        <Route path="/spares" element={<BikeList />} />
        <Route path="/spares/bike/:slug" element={<BikePage />} />
        <Route path="/spares/bike/:bikeSlug/part/:partSlug" element={<PartPage />} />

        {/* OTHER PUBLIC */}
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* ADMIN */}
        <Route path="/admin/*" element={<PrivateRoute component={AdminLayout} />} />

        {/* 404 */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;