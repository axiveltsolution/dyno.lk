import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import "./CheckoutModal.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function CheckoutModal({ onClose, cartItems, totalPrice }) {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const hasKnownPrice = cartItems.some((item) => item.price > 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // CHECK IF CART IS EMPTY
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty. Please add items before inquiry.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          notes: formData.notes.trim() || "",
        },
        items: cartItems.map((item) => ({
          itemId: item._id || item.id,
          itemType: item.type || "electrical",
          title: item.title,
          price: item.price > 0 ? item.price : null,
          quantity: item.quantity || 1,
        })),
        totalPrice: Math.round(totalPrice), // Ensure it's a number
      };

      // Debug log to check what you're sending
      // Removed console.log for security reasons - do not log sensitive customer data

      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order");
      }

      setSuccess(true);

      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Order submission error:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const successNode = (
      <div className="checkout-modal-overlay">
        <div className="checkout-modal success-modal">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Inquiry Submitted Successfully!</h2>
            <p>Thank you for your inquiry.</p>
            <p className="success-details">
              Confirmation has been sent to <strong>{formData.email}</strong>
            </p>
            <p className="success-details">
              Our team will contact you via WhatsApp on{" "}
              <strong>{formData.phone}</strong>
            </p>
            <button className="success-close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );

    return typeof document !== "undefined"
      ? createPortal(successNode, document.body)
      : successNode;
  }

  const node = (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal">
        {/* Header */}
        <div className="checkout-header">
          <h2>Inquiry</h2>
          <button className="checkout-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="checkout-content">
          {/* Order Summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.type}`} className="summary-item">
                  <span className="item-info">
                    {item.quantity}x {item.title}
                  </span>
                  {item.price > 0 && (
                    <span className="item-price">
                      {`LKR ${(item.price * item.quantity).toLocaleString()}`}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {hasKnownPrice && (
              <div className="summary-total">
                <span>Total:</span>
                <span>{`LKR ${totalPrice.toLocaleString()}`}</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery Details</h3>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94712345678"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, city, postal code"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions..."
                rows="2"
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" disabled={loading} className="form-submit">
              {loading ? "Processing..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(node, document.body)
    : node;
}
