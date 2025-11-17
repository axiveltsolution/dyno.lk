import React from "react";
import NavBar from "../../../Components/NavBar/NavBar";
import Empty from "./Sections/emptysection";

import HeroSection from "./sections/HeroSection";
import ScooterModels from "./sections/ScooterModels";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <ScooterModels />
      <Empty />
    </div>
  );
}
