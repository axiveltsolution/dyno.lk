// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./index.css";

import ScrollToTop from "./Utils/ScrollToTop";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicLayout from "./Pages/Public/PublicLayout/PublicLayout";

// PUBLIC PAGES
import Home from "./Pages/Public/Home/Home";
import ContactUs from "./Pages/Public/ContactUs/ContactUs";
import AboutUs from "./Pages/Public/AboutUs/AboutUs";
import OurFactory from "./Pages/Public/OurFactory/OurFactory";

// Scooters
import Scooters from "./Pages/Public/Scooters/Scooters";
import ScooterDetail from "./Pages/Public/Scooters/ScooterDetail";

// Electrical Accessories (NEW!)
import ElectricalAccessories from "./Pages/Public/ElectricalAccessories/ElectricalAccessories";

// Electricals (existing)
import ElectricalList from "./Pages/Public/Electricals/ElectricalList";
import ElectricalDetail from "./Pages/Public/Electricals/ElectricalDetail";

// Spare Parts
import BikeList from "./Pages/Public/SpareParts/BikeList";
import BikePage from "./Pages/Public/SpareParts/BikePage";
import PartPage from "./Pages/Public/SpareParts/PartPage";

// Engineering Pages
import Modelling from "./Pages/Public/Engineering/Modelling";
import Scanning from "./Pages/Public/Engineering/Scanning";
import Printing from "./Pages/Public/Engineering/Printing";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>

        {/* =============== HOME & MAIN PAGES =============== */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/contactus"
          element={
            <PublicLayout>
              <ContactUs />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutUs />
            </PublicLayout>
          }
        />
        <Route
          path="/ourfactory"
          element={
            <PublicLayout>
              <OurFactory />
            </PublicLayout>
          }
        />

        {/* =============== SCOOTERS =============== */}
        <Route
          path="/scooters"
          element={
            <PublicLayout>
              <Scooters />
            </PublicLayout>
          }
        />

        {/* =============== PLASTIC PRODUCTS =============== */}
        {/* Automotive Plastic Spares */}
        <Route
          path="/scooters/:id"
          element={
            <PublicLayout>
              <ScooterDetail />
            </PublicLayout>
          }
        />
        <Route
          path="/plastic/spares"
          element={
            <PublicLayout>
              <BikeList />
            </PublicLayout>
          }
        />

        {/* ELECTRICAL ACCESSORIES – THIS WAS MISSING! NOW FIXED */}
        <Route
          path="/plastic/electrical"
          element={
            <PublicLayout>
              <ElectricalAccessories />
            </PublicLayout>
          }
        />

        {/* =============== SPARE PARTS DYNAMIC ROUTES =============== */}
        <Route
          path="/spares/bike/:slug"
          element={
            <PublicLayout>
              <BikePage />
            </PublicLayout>
          }
        />
        <Route
          path="/spares/bike/:bikeSlug/part/:partSlug"
          element={
            <PublicLayout>
              <PartPage />
            </PublicLayout>
          }
        />

        {/* =============== ELECTRICALS (EXISTING) =============== */}
        <Route
          path="/electricals"
          element={
            <PublicLayout>
              <ElectricalList />
            </PublicLayout>
          }
        />
        <Route
          path="/electricals/:slug"
          element={
            <PublicLayout>
              <ElectricalDetail />
            </PublicLayout>
          }
        />

        <Route
          path="/engineering/modelling"
          element={
            <PublicLayout>
              <Modelling />
            </PublicLayout>
          }
        />
        <Route
          path="/engineering/scanning"
          element={
            <PublicLayout>
              <Scanning />
            </PublicLayout>
          }
        />
        <Route
          path="/engineering/printing"
          element={
            <PublicLayout>
              <Printing />
            </PublicLayout>
          }
        />

        {/* PROTECTED */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* =============== 404 =============== */}
        <Route path="*" element={<h2 style={{ padding: "100px", textAlign: "center" }}>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;