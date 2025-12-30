import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

// Import images
import img1 from "../../../assets/engineering_design/3d_modeling.jpg";
import img2 from "../../../assets/engineering_design/3d_modeling2.jpg";

// Images from engineering_design folder
const IMG_1 = img1;
const IMG_2 = img2;

export default function Modelling() {
  return (
    <EngineeringPageTemplate
      title="3D Modelling"
      subtitle="Precision Engineering Through Digital Design"
      heroImage={IMG_1}
      introText="Transform your ideas into precise digital models with our advanced 3D modelling services."
      section1Title="Advanced 3D Modelling"
      section1Image={IMG_1}
      section1Text={
        <>
          <p>
            Our 3D modelling services utilize cutting-edge software and hardware
            to create accurate, detailed digital representations of your
            products. From concept to prototyping, we ensure every design meets
            the highest standards.
          </p>
          <p>
            Leveraging CAD/CAM technologies, our team delivers models optimized
            for manufacturing, performance, and cost-efficiency.
          </p>
        </>
      }
      section2Title="Comprehensive Design Solutions"
      section2Image={IMG_2}
      section2Text={
        <>
          <p>
            Whether developing new products or reverse engineering existing
            components, our expertise covers all aspects of digital design. We
            work closely with clients to drive innovation.
          </p>
          <p>
            Our in-house R&D centre is equipped with the latest tools, ensuring
            your projects are completed efficiently.
          </p>
        </>
      }
      benefits={[
        "High-precision digital models for prototyping",
        "Optimized designs for manufacturing",
        "Reduced development time and costs",
        "Enhanced visualization and communication",
        "Seamless integration with 3D printing",
      ]}
    />
  );
}
