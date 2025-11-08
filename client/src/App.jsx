import { Routes, Route } from "react-router-dom";
import "./index.css";

import ScrollToTop from "./Utils/ScrollToTop";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicLayout from "./Pages/Public/PublicLayout/PublicLayout";

import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import Home from "./Pages/Public/Home/Home";
import ContactUs from "./Pages/Public/ContactUs/ContactUs";

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
