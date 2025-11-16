import React, { useState } from "react";
import "./AboutUs.css";

import SectionHero from "../Components/SectionHero";

import HeroBg from "./../../../assets/HomeHero/herobg-1.webp";
import OurStoryImg from "./../../../assets/aboutus/ourstory.png";
import FlagshipImg from "./../../../assets/aboutus/flagshipproduct.jpg";
import ScooterSeatImg from "./../../../assets/aboutus/scooterseat.jpg";
import PlasticInjectionImg from "./../../../assets/aboutus/plasticinjection.jpg";
import ScanningImg from "./../../../assets/aboutus/3dscanning.jpg";
import CapabilitiesImg from "./../../../assets/aboutus/20220802_094713994543-1024x768.jpg";

export default function AboutUs() {
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const formValidation = (formData) => {
    let errorMessage = "";

    if (formData.name === "") {
      errorMessage = "Name is required";
    } else if (formData.phonenumber === "") {
      errorMessage = "Phone Number is required";
    } else if (formData.email === "") {
      errorMessage = "Email is required";
    } else if (formData.message === "") {
      errorMessage = "Write your message";
    } else {
      errorMessage = "";
    }

    setError(errorMessage);
    return errorMessage === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_ENDPOINT = "http://localhost:7001/api/Contactus";

    const isValid = formValidation(formData);
    if (!isValid) {
      console.log("Validation failed. Stopping submission.");
      return;
    }

    console.log("Form data is ready to send:", formData);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Error sending message");
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Thank you! Your message has been sent.");

      setFormData({
        name: "",
        phonenumber: "",
        email: "",
        message: "",
      });
      setError("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Failed to send message: ${error.message}`);
    }
  };

  return (
    <div className="about-us-page">
      <SectionHero
        bgImage={HeroBg}
        title="About Us"
        description="Dyno Innovations (Private) Limited"
      />
      <div className="about-content section-container">
        <p className="intro">
          We are a true Sri Lankan company. Our primary intention is to introduce a wide range of products with unparalleled quality and durability enhanced by trusted aftersales service to the Nation.
        </p>

        <section className="story-section">
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              Dyno Innovations (Private) Limited is a full-fledged Sri Lankan company that has proudly joined hands with the Sri Lankan business directory. Our main objective is to introduce a wide range of products and service with unparalleled quality. Assembling and Production of Two-Wheelers (Scooters), Injection moulding of engineering plastic products and motor vehicle components are our key businesses. Our Engineering Research and Development Centre (PLM) is equipped with latest high-tech equipment and software for CAE (CAD/CAM) and FEA operation.
            </p>
          </div>
          <div className="image-content">
            <img src={OurStoryImg} alt="Our Story" />
          </div>
        </section>

        <section className="flagship-section">
          <div className="image-content">
            <img src={FlagshipImg} alt="Flagship Product" />
          </div>
          <div className="text-content">
            <p>
              The DYNO scooter is our flagship product, and announce that DYNO scooters are fully assembled in Sri Lanka, with 14 components locally manufactured to high standards. Six important plastic parts of the Scooter such as Front Mud Guard, Rear Mud Guard, Rear Mud Flap, Two Side Covers and Complete Seat Base are manufactured in our very own plastic injection moulding factory. In the process of manufacturing the plastic components, we make adjustments to the designs to ensure that the product is improved and conforms to high quality and durability. Other components such as Handlebar, Side stand, Main stand, all seat brackets and hinges, Mud Flap bracket and Grab handle are sourced from reputed Sri Lankan suppliers.
            </p>
          </div>
        </section>

        <section className="scooter-seat-section">
          <div className="text-content">
            <p>
              For the first time in Sri Lanka, the complete scooter seat (seat base, Hinge, brackets, seat cushion and seat cover) has been manufactured locally. Tyres and Batteries which are required for production are also locally produced and sourced from leading tyre and battery manufacturers in Sri Lanka. All these components are assembled to produce the perfect DYNO scooter by skilled technicians in our scooter assembly facility at Makumbura, Pannipitiya. Our ultimate objective is manufacturing a scooter in Sri Lanka and current assembling with value addition is a stepping up activity of our long journey.
            </p>
          </div>
          <div className="image-content">
            <img src={ScooterSeatImg} alt="Scooter Seat" />
          </div>
        </section>

        <section className="plastic-injection-section">
          <div className="image-content">
            <img src={PlasticInjectionImg} alt="Plastic Injection" />
          </div>
          <div className="text-content">
            <p>
              Our plastic injection moulding factory is equipped with advanced technology available in Sri Lanka and produces all plastic parts required for Dyno scooters and other plastic accessories for vehicles including motorcycles and three-wheelers. We are proud to announce that we are among the very few who has embarked in manufacturing automobile plastic components in Sri Lanka. Many products including the Sunk box, Junction box, Ceiling rose and Meter enclosures required for the building construction industry are also manufactured and released to the market. In the meantime, we manufacture plastic components for many leading companies in Sri Lanka.
            </p>
          </div>
        </section>

        <section className="scanning-section">
          <div className="text-content">
            <p>
              3D Scanning, 3D printing, Engineering Designs, Mould design are engineering technology services provided by our company's Engineering Research and Development Centre. All the design work required for our production as well as the design work required for external organizations are carried out by our in-house research unit.
            </p>
          </div>
          <div className="image-content">
            <img src={ScanningImg} alt="3D Scanning" />
          </div>
        </section>

        <section className="capabilities-section">
          <div className="image-content">
            <img src={CapabilitiesImg} alt="Our Capabilities" />
          </div>
          <div className="text-content">
            <h2>Our Capabilities</h2>
            <p>
              Dyno Innovations (Private) Limited has the technology and know-how to carry out assembling through a conveyorised system and PDI of DYNO scooters, using 14 items made locally. We have perfected the technology and know-how to manufacture plastic parts required for vehicles along with the engineering technology and other fields through plastic injection moulding products. We are also well-equipped with the knowledge and ability in engineering technology services including 3D Scan, 3D printing, Engineering Design, Mould design.
            </p>
          </div>
        </section>

        <section className="business-areas-section">
          <h2>Key Business Areas</h2>
          <ul>
            <li>Assembling and Production of Two-wheelers (Scooters)</li>
            <li>Injection moulding of engineering plastic products</li>
            <li>Engineering Research and Development Centre (PLM) CAE – CAD/CAM and FEA operation</li>
          </ul>
        </section>

        <section className="contact-interest-section">
          <h2>INTERESTED IN OUR SERVICES?</h2>
          <p>Call: +94 112891485</p>
          <p>Alternatively use the form below and we will call you back.</p>
          <p>Tell us a little about the project so we can have the best person call you.</p>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={formData.name}
              />

              <label htmlFor="phonenumber">Phone Number</label>
              <input
                type="text"
                name="phonenumber"
                placeholder="Your Phone Number"
                onChange={handleChange}
                value={formData.phonenumber}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                value={formData.email}
              />

              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Tell us about your project"
                onChange={handleChange}
                value={formData.message}
              />

              <button className="contact-submit-btn" type="submit">
                Send Message
              </button>
            </form>

            <p className="error-message">{error}</p>
          </div>
        </section>
      </div>
    </div>
  );
}