// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

import ScrollToTop from "./Utils/ScrollToTop";
import ImagePreloader from "./Components/ImagePreloader/ImagePreloader";
import {
  FACTORY_PAGE_IMAGES,
  HOME_PAGE_IMAGES,
  SCOOTER_DETAIL_IMAGES,
  SCOOTERS_PAGE_IMAGES,
  SPARE_PARTS_PAGE_IMAGES,
} from "./Utils/preloadImages";
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

const EMPTY_IMAGES = [];

function ScooterDetailRoute() {
  const { id } = useParams();

  return (
    <ImagePreloader
      key={id}
      cacheKey={`scooter-detail-${id}`}
      images={SCOOTER_DETAIL_IMAGES[id] || EMPTY_IMAGES}>
      <PublicLayout>
        <ScooterDetail />
      </PublicLayout>
    </ImagePreloader>
  );
}

function App() {
  useEffect(() => {
    // Prevent right-click context menu on images to hide image paths
    const handleContextMenu = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    // Prevent dragging images
    const handleDragStart = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* =============== HOME & MAIN PAGES =============== */}
        <Route
          path="/"
          element={
            <ImagePreloader cacheKey="home" images={HOME_PAGE_IMAGES}>
              <PublicLayout>
                <Home />
              </PublicLayout>
            </ImagePreloader>
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
            <ImagePreloader cacheKey="factory" images={FACTORY_PAGE_IMAGES}>
              <PublicLayout>
                <OurFactory />
              </PublicLayout>
            </ImagePreloader>
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
            <ImagePreloader
              cacheKey="scooters-list"
              images={SCOOTERS_PAGE_IMAGES}>
              <PublicLayout>
                <Scooters />
              </PublicLayout>
            </ImagePreloader>
          }
        />

        {/* =============== PLASTIC PRODUCTS =============== */}
        <Route path="/scooters/:id" element={<ScooterDetailRoute />} />

        {/* =============== SPARE PARTS =============== */}
        <Route
          path="/spares"
          element={
            <ImagePreloader
              cacheKey="spare-parts-list"
              images={SPARE_PARTS_PAGE_IMAGES}>
              <PublicLayout>
                <BikeList />
              </PublicLayout>
            </ImagePreloader>
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
