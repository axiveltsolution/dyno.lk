import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
} from "lucide-react";
import "./ContactUs.css";

// Shared Component
import CommonHero from "../../../Components/CommonHero/CommonHero";

// Placeholder for BG
const CONTACT_BG = "https://picsum.photos/1920/1080?random=15";

// API Base (Keep your env logic)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function ContactUs() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // "idle", "sending", "success", "error"
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill message if navigated from scooter inquiry button
  useEffect(() => {
    if (location.state?.inquireModel) {
      const inquiryMessage = `Hi, I am interested in inquiring about the ${location.state.inquireModel}. Could you please provide more information about this scooter model, pricing, and availability?`;
      setFormData((prev) => ({
        ...prev,
        message: inquiryMessage,
      }));
    } else {
      // Clear message if coming from other sources
      setFormData((prev) => ({
        ...prev,
        message: "",
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phonenumber,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", phonenumber: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="dyno-contact-page">
      {/* 1. HERO */}
      <CommonHero
        title="Contact Us"
        subtitle="Let's Build The Future Together"
        bgImage={CONTACT_BG}
        parentPage="Support"
      />

      {/* 2. MAIN CONTENT GRID */}
      <div className="container dyno-contact-wrapper">
        <div className="dyno-contact-grid">
          {/* LEFT: INFO PANEL */}
          <div className="dyno-info-panel">
            <h3 className="dyno-panel-title">
              Get In <span className="text-red">Touch</span>
            </h3>
            <p className="dyno-panel-desc">
              Have a project in mind or need technical support? Our engineering
              team is ready to assist you.
            </p>

            <div className="dyno-info-list">
              <div className="dyno-info-item">
                <div className="info-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="info-label">Head Office</h4>
                  <p className="info-text">
                    No 376/C, Maya Avenue,
                    <br />
                    Makumbura, Pannipitiya
                  </p>
                </div>
              </div>

              <div className="dyno-info-item">
                <div className="info-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="info-label">Phone</h4>
                  <a href="tel:+94112891666" className="info-link">
                    Hotline: 0112 891 666
                  </a>
                  <a href="tel:+94112891485" className="info-link">
                    Office: 0112 891 485
                  </a>
                </div>
              </div>

              <div className="dyno-info-item">
                <div className="info-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="info-label">Email</h4>
                  <a href="mailto:info@dyno.lk" className="info-link">
                    info@dyno.lk
                  </a>
                </div>
              </div>

              <div className="dyno-info-item">
                <div className="info-icon-box">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="info-label">Hours</h4>
                  <p className="info-text">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="info-text">Sat: 8:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="dyno-social-row">
              <a href="#" className="social-btn">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-btn">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* RIGHT: DARK FORM */}
          <div className="dyno-form-panel">
            <form onSubmit={handleSubmit} className="dyno-form">
              <h3 className="form-heading">Send a Message</h3>

              <div className="contact-form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="dyno-input"
                />
              </div>

              <div className="contact-form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="+94 77 ..."
                  className="dyno-input"
                />
              </div>

              {/* FIXED TYPO HERE */}
              <div className="contact-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="dyno-input"
                />
              </div>

              {/* FIXED TYPO HERE */}
              <div className="contact-form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="dyno-input dyno-textarea"
                ></textarea>
              </div>

              {errorMsg && <div className="form-error">{errorMsg}</div>}
              {status === "success" && (
                <div className="form-success">Message Sent Successfully!</div>
              )}

              <button
                type="submit"
                className="btn btn-primary form-submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                {!status && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. MAP SECTION */}
      <div className="dyno-map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0837236756!2d79.9577!3d6.8806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae250e260907e25%3A0x6a203f905006093d!2sPannipitiya!5e0!3m2!1sen!2slk!4v1234567890"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(30%) invert(0%) contrast(90%)",
          }} // Dark Mode Map Hack
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dyno Location"
        ></iframe>
      </div>
    </div>
  );
}
