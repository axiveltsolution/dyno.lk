import React from "react";
import Navbar from "./../../../Components/NavBar/NavBar";
import Footer from "../../../Components/Footer/Footer";

import CartSidebar from "../../../Components/CartSidebar/CartSidebar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
