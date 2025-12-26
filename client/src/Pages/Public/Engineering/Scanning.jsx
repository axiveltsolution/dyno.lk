import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

// Temporary Picsum Images
const HERO_IMG = "https://picsum.photos/1920/1080?random=60";
const IMG_1 = "https://picsum.photos/800/600?random=61";
const IMG_2 = "https://picsum.photos/800/600?random=62";

export default function Scanning() {
  return (
    <EngineeringPageTemplate
      title="3D Scanning"
      subtitle="Capture Reality with Precision Technology"
      heroImage={HERO_IMG}
      introText="Capture intricate details and complex geometries with our state-of-the-art 3D scanning services. We turn physical objects into precise digital data."
      section1Title="Advanced Scanning Tech"
      section1Image={IMG_1}
      section1Text={
        <>
          <p>
            Our 3D scanning services utilize cutting-edge laser and structured
            light scanning technology to create highly accurate digital
            representations of physical objects. From small components to large
            assemblies, we capture every detail with precision and speed.
          </p>
          <p>
            This technology is essential for reverse engineering, quality
            control, digital archiving, and creating accurate CAD models for
            manufacturing.
          </p>
        </>
      }
      section2Title="Comprehensive Solutions"
      section2Image={IMG_2}
      section2Text={
        <>
          <p>
            Whether you need to digitize existing parts for reproduction,
            inspect components for quality assurance, or create digital twins
            for analysis, our 3D scanning services provide the accuracy you
            need.
          </p>
          <p>
            Our skilled technicians ensure that scans are processed efficiently,
            resulting in clean, usable data that integrates seamlessly with your
            design workflows.
          </p>
        </>
      }
      benefits={[
        "High-accuracy capture of complex geometries",
        "Non-contact scanning preserves original objects",
        "Fast processing for reduced project timelines",
        "Compatible with all major CAD software",
        "Ideal for reverse engineering and quality inspection",
      ]}
    />
  );
}
