import React, { useEffect, useRef } from "react";
import { Phone, CheckCircle } from "lucide-react";
import "./CapabilitiesContact.css";

// Upload your blue pellets image here
import PelletsBg from "../../../../assets/capabilities/pellets-bg.jpg";

export default function CapabilitiesContact() {
  const refs = useRef([]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        } else {
          entry.target.classList.remove("animate-in");
        }
      });
    },
    { threshold: 0.2 }
  );

  refs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  return () => {
    refs.current.forEach((ref) => {
      if (ref) observer.unobserve(ref);
    });
  };
}, []);

  return (
    <section className="capabilities-contact-section">
      {/* === PART 1: OUR CAPABILITIES === */}
      <div className="capabilities-content">
        <div className="capabilities-inner">
          <h3
            className="capabilities-subtitle"
            ref={(el) => (refs.current[0] = el)}
          >
            We Provide
          </h3>
          <h2
            className="capabilities-title"
            ref={(el) => (refs.current[1] = el)}
          >
            OUR CAPABILITIES
          </h2>
          <div
            className="capabilities-underline"
            ref={(el) => (refs.current[2] = el)}
          ></div>

          <p
            className="capabilities-text"
            ref={(el) => (refs.current[3] = el)}
          >
            Dyno Innovations (Private) Limited has the technology and know-how to carry out assembling through a conveyorised system and PDI of DYNO scooters, using 14 items made locally. We have perfected the technology and know-how to manufacture plastic parts required for vehicles along with the engineering technology and other fields through plastic injection moulding products. We are also well-equipped with the knowledge and ability in engineering technology services including 3D Scan, 3D printing, Engineering Design, Mould design.
          </p>

          <div
            className="capabilities-list"
            ref={(el) => (refs.current[4] = el)}
          >
            <h4 className="list-title">Key Business Areas</h4>
            <ul>
              <li>
                <CheckCircle className="check-icon" />
                Assembling and Production of Two-wheelers (Scooters)
              </li>
              <li>
                <CheckCircle className="check-icon" />
                Injection moulding of engineering plastic products
              </li>
              <li>
                <CheckCircle className="check-icon" />
                Engineering Research and Development Centre (PLM) CAE – CAD/CAM and FEA operation
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* === PART 2: INTERESTED CTA === */}
      <div
        className="interested-cta"
        style={{ backgroundImage: `url(${PelletsBg})` }}
        ref={(el) => (refs.current[5] = el)}
      >
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2 className="cta-title">INTERESTED IN OUR SERVICES?</h2>
          <div className="cta-phone">
            <Phone size={38} className="phone-icon" />
            <span>CALL: +94 112891485</span>
          </div>
          <p className="cta-desc">
            Alternatively use the form below and we will call you back.
            <br />
            Tell us a little about the project so we can have the best person call you.
          </p>
          <button className="cta-btn">CONTACT US</button>
        </div>
      </div>
    </section>
  );
}