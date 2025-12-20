import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

const IMG_1 = "https://picsum.photos/800/600?random=3";
const IMG_2 = "https://picsum.photos/800/600?random=4";

export default function Printing() {
  return (
    <EngineeringPageTemplate
      title="3D Printing"
      subtitle="Bring Digital Designs to Life"
      heroImage={IMG_1}
      introText="Transform digital models into physical prototypes and products with our advanced 3D printing capabilities."
      section1Title="State-of-the-Art 3D Printing"
      section1Image={IMG_1}
      section1Text={
        <>
          <p>
            Our 3D printing services utilize the latest additive manufacturing
            technologies to create complex, custom parts. From rapid prototyping
            to end-use production, we deliver high-quality results.
          </p>
          <p>
            With multiple printing technologies available, we handle projects of
            any size and complexity.
          </p>
        </>
      }
      section2Title="From Prototype to Production"
      section2Image={IMG_2}
      section2Text={
        <>
          <p>
            We ensure optimal performance and cost-effectiveness for every print
            job. Our materials range from standard prototyping plastics to
            engineering-grade polymers.
          </p>
        </>
      }
      benefits={[
        "Rapid prototyping for faster development",
        "Complex geometries made simple",
        "Reduced material waste",
        "Customized solutions",
        "Wide range of materials",
      ]}
    />
  );
}
