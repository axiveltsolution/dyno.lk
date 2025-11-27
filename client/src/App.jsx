import { Routes, Route } from "react-router-dom";
import "./index.css";

import ScrollToTop from "./Utils/ScrollToTop";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicLayout from "./Pages/Public/PublicLayout/PublicLayout";

import Home from "./Pages/Public/Home/Home";
import ContactUs from "./Pages/Public/ContactUs/ContactUs";
import AboutUs from "./Pages/Public/AboutUs/AboutUs";
import OurFactory from "./Pages/Public/OurFactory/OurFactory";

// Scooters Page
import Scooters from "./Pages/Public/Scooters/Scooters";
import ScooterDetail from "./Pages/Public/Scooters/ScooterDetail";

import ElectricalList from "./Pages/Public/Electricals/ElectricalList";
import ElectricalDetail from "./Pages/Public/Electricals/ElectricalDetail";

// Spare Parts Pages
import BikeList from "./Pages/Public/SpareParts/BikeList";
import BikePage from "./Pages/Public/SpareParts/BikePage";
import PartPage from "./Pages/Public/SpareParts/PartPage";

// Engineering Pages
import Modelling from "./Pages/Public/Engineering/Modelling";
import Scanning from "./Pages/Public/Engineering/Scanning";
import Printing from "./Pages/Public/Engineering/Printing";
import ProductDesigning from "./Pages/Public/Engineering/ProductDesigning";
import ReverseEngineering from "./Pages/Public/Engineering/ReverseEngineering";
import Visualising from "./Pages/Public/Engineering/Visualising";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC PAGES WITH NAVBAR */}
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
          path="/scooters"
          element={
            <PublicLayout>
              <Scooters />
            </PublicLayout>
          }
        />
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
        <Route
          path="/ourfactory"
          element={
            <PublicLayout>
              <OurFactory />
            </PublicLayout>
          }
        />
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
        <Route
          path="/engineering/productdesigning"
          element={
            <PublicLayout>
              <ProductDesigning />
            </PublicLayout>
          }
        />
        <Route
          path="/engineering/reverseengineering"
          element={
            <PublicLayout>
              <ReverseEngineering />
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

        {/* 404 */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
