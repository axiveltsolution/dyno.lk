import React, { useState } from "react";
import "./ContactUs.css";

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
    <div className="contact-us-page">
      <header className="contact-page-header">
        <h2>Contact us</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos,
          repudiandae!
        </p>
      </header>
      <div className="contact-section-grid">
        <div className="contact-details">
          <h3>Contact details</h3>
          <a href="#">email</a>
          <a href="#">phone</a>
          <a href="#">etc</a>
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
    </div>
  );
}
