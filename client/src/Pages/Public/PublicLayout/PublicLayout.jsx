import React from "react";
import Navbar from "./../../../Components/NavBar/NavBar";
// import Footer from "../../Components/Footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
