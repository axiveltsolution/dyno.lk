import React, { useState } from "react";
import "./ContactUs.css";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import SectionHero from "../Components/SectionHero";

import ServiceHeroBg from "./../../../assets/HomeHero/herobg-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactUs() {
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
    <div className="contact-us-page contact">
      <SectionHero
        bgImage={ServiceHeroBg}
        title="Contact Us"
        description="We're here to help. Reach out to discuss your project or get answers to your questions."
        buttonText="Call Us Now"
        buttonLink="tel:+94112891485"
      />
      <div></div>
      <header className="contact-page-header section-container">
        <h2>Get in Touch</h2>
        <p>
          At Dyno Innovations we are always available and happy to help in any
          situation. If you have questions about any of the services we offer,
          we invite you to contact us.
        </p>
      </header>
      <div className="contact-section-grid section-container">
        <div className="contact-details">
          <h3>Contact Details</h3>

          <div className="contact-item">
            <h4>Address</h4>
            <p>
              No 376/C, Maya Avenue,
              <br />
              Makumbura, Pannipitiya
            </p>
          </div>

          <div className="contact-item">
            <h4>Phone</h4>
            <p>
              Hotline: <a href="tel:+94112891666">0112 891 666</a>
            </p>
            <p>
              Office: <a href="tel:+94112891485">0112 891 485</a>
            </p>
          </div>

          <div className="contact-item">
            <h4>Email</h4>
            <p>
              <a href="mailto:info@dyno.lk">info@dyno.lk</a>
            </p>
          </div>

          <div className="contact-item">
            <h4>Business Hours</h4>
            <p>
              Monday - Friday: 8:00 AM - 5:00 PM
              <br />
              Saturday: 8:00 AM - 1:00 PM
            </p>
          </div>
        </div>

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
              placeholder="Write your message"
              onChange={handleChange}
              value={formData.message}
            />

            <button className="contact-submit-btn" type="submit">
              Send Message
            </button>
          </form>

          <p className="error-message">{error}</p>
        </div>
      </div>
      <div className="social-links">
        <h2>Follow Us</h2>
        <p>Need a content</p>
        <div className="social-icons">
          <a href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} className="fab fa-facebook" />
          </a>
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="fab fa-instagram" />
          </a>
        </div>
      </div>
      <div className="contact-map" style={{ lineHeight: 0 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15846.689656370016!2d80.48908844148798!3d6.80964274100523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3977589234b59%3A0x8723ad471d5b37dc!2sSri%20Pada%20%2F%20Adam&#39;s%20Peak!5e0!3m2!1sen!2slk!4v1762746220839!5m2!1sen!2slk" // your link
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}
