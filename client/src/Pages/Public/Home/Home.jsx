import React from "react";
import NavBar from "../../../Components/NavBar/NavBar";

import HeroSection from "./Sections/HeroSection";
import ScooterModels from "./Sections/ScooterModels";
import CapabilitiesAbout from "./Sections/CapabilitiesAbout";
import ContactBanner from "./Sections/ContactBanner";

export default function Home() {
  return (
    <div className="dyno-home-page">
      <NavBar />
      <HeroSection />
      <ScooterModels />
      <CapabilitiesAbout />
      <ContactBanner />
    </div>
  );
}
