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
import Career from "./Pages/Public/Career/Career";

// 404 page
import NotFound from "./Components/NotFound/NotFound";

// Scooters
import Scooters from "./Pages/Public/Scooters/Scooters";
import ScooterDetail from "./Pages/Public/Scooters/ScooterDetail";

// Electrical Accessories (NEW!)
import ElectricalAccessories from "./Pages/Public/ElectricalAccessories/ElectricalAccessories";
import ElectricalDetail from "./Pages/Public/ElectricalAccessories/ElectricalDetail";

// Spare Parts
import BikeList from "./Pages/Public/AutomotiveParts/BikeList";
import BikePage from "./Pages/Public/AutomotiveParts/BikePage";
import PartPage from "./Pages/Public/AutomotiveParts/PartPage";

// Engineering Pages
import ModellingReverse from "./Pages/Public/Engineering/ModellingReverse";
import Scanning from "./Pages/Public/Engineering/Scanning";
import Printing from "./Pages/Public/Engineering/Printing";
import ProductDesigning from "./Pages/Public/Engineering/ProductDesigning";
import Visualising from "./Pages/Public/Engineering/Visualising";

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
        <Route
          path="/careers"
          element={
            <PublicLayout>
              <Career />
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
        <Route
          path="/scooters/:id"
          element={
            <PublicLayout>
              <ScooterDetail />
            </PublicLayout>
          }
        />

        {/* =============== SPARE PARTS =============== */}
        <Route
          path="/spares"
          element={
            <PublicLayout>
              <BikeList />
            </PublicLayout>
          }
        />

        {/* =============== ELECTRICAL ACCESSORIES =============== */}
        <Route
          path="/electricals"
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
        {/* <Route
          path="/electricals"
          element={
            <PublicLayout>
              <ElectricalList />
            </PublicLayout>
          }
        /> */}
        <Route
          path="/electricals/:slug"
          element={
            <PublicLayout>
              <ElectricalDetail />
            </PublicLayout>
          }
        />

        <Route
          path="/engineering/3d-and-reverse-engineering"
          element={
            <PublicLayout>
              <ModellingReverse />
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
        <Route
          path="/engineering/productdesigning"
          element={
            <PublicLayout>
              <ProductDesigning />
            </PublicLayout>
          }
        />

        <Route
          path="/engineering/visualising"
          element={
            <PublicLayout>
              <Visualising />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
