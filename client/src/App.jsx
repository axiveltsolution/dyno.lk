import "./App.css";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./Pages/Public/PublicLayout/PublicLayout";

import Home from "./Pages/Public/Home/Home";
import ContactUs from "./Pages/Public/ContactUs/ContactUs";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";

import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <div className="app-container">
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
