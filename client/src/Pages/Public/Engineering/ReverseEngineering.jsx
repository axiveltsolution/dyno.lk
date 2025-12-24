import React from "react";
import EngineeringPageTemplate from "./Layout/EngineeringPart.jsx";

// Import image
import reverse from "../../../assets/engineering_design/reverseengineering.jpg";

const HERO_IMG = reverse;
const IMG_1 = reverse;
const IMG_2 = reverse;

export default function ReverseEngineering() {
  return (
    <EngineeringPageTemplate
      title="Reverse Engineering"
      subtitle="Unlocking Secrets of Existing Products"
      heroImage={HERO_IMG}
      introText="Discover the inner workings of products with our advanced reverse engineering services. We decode physical objects into digital intelligence."
      section1Title="Comprehensive Analysis"
      section1Image={IMG_1}
      section1Text={
        <>
          <p>
            Our reverse engineering services allow you to analyze, understand,
            and replicate existing products or components. Using
            state-of-the-art scanning and analysis techniques, we create
            accurate digital models and specifications from physical objects.
          </p>
          <p>
            This process is invaluable for product improvement, spare parts
            manufacturing, competitive analysis, and bringing legacy products
            into the digital age.
          </p>
        </>
      }
      section2Title="Advanced Techniques"
      section2Image={IMG_2}
      section2Text={
        <>
          <p>
            From 3D scanning to material analysis and functional testing, our
            process provides complete insights into product design, materials,
            and manufacturing methods. We help you identify design flaws and
            optimize performance.
          </p>
          <p>
            Our team ensures that all reverse engineered designs are legally
            compliant and respect intellectual property rights, providing you
            with reliable and actionable data.
          </p>
        </>
      }
      benefits={[
        "Accurate digital recreation of physical products",
        "Identification of design improvements",
        "Cost-effective spare parts solutions",
        "Competitive product benchmarking",
        "Seamless integration with 3D scanning",
      ]}
    />
  );
}
