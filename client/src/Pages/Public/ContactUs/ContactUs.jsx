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

// Helper to get base URL (adjust if needed)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "", // Note: Backend expects "phone"
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // "sending", "success", "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (error) setError("");
  };

  const formValidation = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.message.trim()) return "Message is required";
    // Phone is optional in your backend, so we don't block for it
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate
    const validationError = formValidation();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("sending");
    setError("");

    // 2. Prepare payload (Map frontend "phonenumber" to backend "phone")
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phonenumber, // Mapping here
      message: formData.message,
    };

    try {
      // 3. Send Request
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // 4. Success Handling
      setStatus("success");
      setFormData({ name: "", phonenumber: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
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
              disabled={status === "sending"}
            />

            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              placeholder="Your Phone Number"
              onChange={handleChange}
              value={formData.phonenumber}
              disabled={status === "sending"}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              value={formData.email}
              disabled={status === "sending"}
            />

            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Write your message"
              onChange={handleChange}
              value={formData.message}
              disabled={status === "sending"}
            />

            <button
              className="contact-submit-btn"
              type="submit"
              disabled={status === "sending"}
              style={{ opacity: status === "sending" ? 0.7 : 1 }}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Feedback Messages */}
          {status === "success" && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#d1fae5",
                color: "#065f46",
                borderRadius: "6px",
              }}>
              ✅ Thank you! Your message has been sent successfully.
            </div>
          )}

          {error && (
            <div
              className="error-message"
              style={{ marginTop: "1rem", color: "red" }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>

      <div className="social-links">
        <h2>Follow Us</h2>
        <p>
          Join our growing community and discover our latest projects, industry
          insights, and company news.
        </p>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15846.689656370016!2d80.48908844148798!3d6.80964274100523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3977589234b59%3A0x8723ad471d5b37dc!2sSri%20Pada%20%2F%20Adam's%20Peak!5e0!3m2!1sen!2slk!4v1762746220839!5m2!1sen!2slk"
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
