import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

const HERO_IMG = "https://picsum.photos/1920/1080?random=70";
const IMG_1 = "https://picsum.photos/800/600?random=71";
const IMG_2 = "https://picsum.photos/800/600?random=72";

export default function Visualising() {
  return (
    <EngineeringPageTemplate
      title="Visualising"
      subtitle="Bringing Ideas to Life Through Visualization"
      heroImage={HERO_IMG}
      introText="Experience your designs in stunning detail with our advanced visualization services. We bridge the gap between engineering data and visual reality."
      section1Title="Immersive Visualization"
      section1Image={IMG_1}
      section1Text={
        <>
          <p>
            Our visualization services transform complex technical designs into
            compelling visual experiences. Using cutting-edge rendering software
            and techniques, we create photorealistic images, animations, and
            interactive presentations that bring your products to life.
          </p>
          <p>
            From concept visualization to marketing materials, our services help
            you communicate design intent and showcase products effectively to
            stakeholders.
          </p>
        </>
      }
      section2Title="Comprehensive Solutions"
      section2Image={IMG_2}
      section2Text={
        <>
          <p>
            Whether you need static renders for presentations, animated
            sequences for demonstrations, or virtual reality experiences for
            immersive design reviews, our visualization team delivers
            high-quality outputs.
          </p>
          <p>
            We work closely with your design and engineering teams to ensure
            accuracy and fidelity in every visualization, helping you make
            informed decisions.
          </p>
        </>
      }
      benefits={[
        "Photorealistic product visualizations",
        "Enhanced communication of design concepts",
        "Improved stakeholder engagement",
        "Marketing-ready visual assets",
        "Integration with 3D modelling services",
      ]}
    />
  );
}
