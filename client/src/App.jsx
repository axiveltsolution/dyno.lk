import "./App.css";
import { Routes, Route } from "react-router-dom";

import ContactUs from "./Pages/Public/ContactUs/ContactUs";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
