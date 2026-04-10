import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

// Import images
import modelingImg from "../../../assets/engineering_design/3d_modeling.jpg";
import reverseImg from "../../../assets/engineering_design/reverseengineering.jpg";

export default function ModellingReverse() {
  return (
    <EngineeringPageTemplate
      title="3D Modelling & Reverse Engineering"
      subtitle="Digital Intelligence meets Precision Engineering"
      heroImage={modelingImg}
      introText="Transform concepts into precise digital models and decode physical objects into digital intelligence with our comprehensive design solutions."
      section1Title="3D Modelling Solutions"
      section1Image={modelingImg}
      section1Text={
        <>
          <p>
            Our 3D modelling services utilize cutting-edge CAD/CAM technologies
            to create accurate, detailed digital representations of your
            products. From concept to prototyping, we ensure every design meets
            the highest standards of manufacturability and cost-efficiency.
          </p>
          <p>
            Our in-house R&D centre is equipped with the latest software and hardware tools, ensuring that your ideas are translated into highly optimized functional models smoothly.
          </p>
        </>
      }
      section2Title="Advanced Reverse Engineering"
      section2Image={reverseImg}
      section2Text={
        <>
          <p>
            We decode the physical world. Our reverse engineering services allow you to analyze, understand,
            and replicate existing products or components. Using
            state-of-the-art scanning capabilities, we create
            accurate digital blueprints directly from physical objects.
          </p>
          <p>
            This ensures reliable actionable data for product improvements, competitive benchmarking, and bringing legacy components into the digital era while strictly relying on compliant processes.
          </p>
        </>
      }
      benefits={[
        "High-precision digital models for prototyping.",
        "Accurate recreations of physical products.",
        "Reduced development time and costs.",
        "Discovery of design and performance improvements.",
        "Seamless integration with 3D scanning and printing.",
      ]}
    />
  );
}
