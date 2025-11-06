import "./App.css";
import { Routes, Route } from "react-router-dom";

import ContactUs from "./Pages/Public/ContactUs/ContactUs";
import AdminLogin from "./Pages/Logins/AdminLogin/AdminLogin";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </div>
  );
}

export default App;
