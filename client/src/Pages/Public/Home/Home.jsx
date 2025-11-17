import React from "react";
import NavBar from "../../../Components/NavBar/NavBar";

import HeroSection from "./sections/HeroSection";
import ScooterModels from "./sections/ScooterModels";
import CapabilitiesAbout from "./sections/CapabilitiesAbout";
import CapabilitiesContact from "./sections/CapabilitiesContact";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <ScooterModels />
      <CapabilitiesAbout />
      <CapabilitiesContact />
    </div>
  );
}
