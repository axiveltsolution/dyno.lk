import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

const HERO_IMG = "https://picsum.photos/1920/1080?random=80";
const IMG_1 = "https://picsum.photos/800/600?random=81";
const IMG_2 = "https://picsum.photos/800/600?random=82";

export default function ProductDesigning() {
  return (
    <EngineeringPageTemplate
      title="Product Designing"
      subtitle="Innovative Design Solutions for Exceptional Products"
      heroImage={HERO_IMG}
      introText="Transform your concepts into market-ready products with our comprehensive product designing services. We blend aesthetics with functionality."
      section1Title="Expert Product Design"
      section1Image={IMG_1}
      section1Text={
        <>
          <p>
            Our product designing team combines creativity, technical expertise,
            and market insights to develop products that not only meet
            functional requirements but also delight customers. From initial
            ideation to detailed specifications, we guide you through every
            stage.
          </p>
          <p>
            Utilizing advanced design software, we create designs that are
            innovative, manufacturable, and optimized for performance, cost, and
            user experience.
          </p>
        </>
      }
      section2Title="End-to-End Services"
      section2Image={IMG_2}
      section2Text={
        <>
          <p>
            Whether you're launching a new product line or redesigning existing
            offerings, our services cover industrial design, engineering design,
            prototyping, and testing. We work closely with manufacturers to
            ensure seamless transition from design to production.
          </p>
          <p>
            Our iterative design approach incorporates user feedback and testing
            to refine products until they achieve perfection.
          </p>
        </>
      }
      benefits={[
        "Innovative and user-centric product designs",
        "Optimized for manufacturing efficiency",
        "Reduced time-to-market strategies",
        "Enhanced product functionality and aesthetics",
        "Seamless 3D modelling integration",
      ]}
    />
  );
}
