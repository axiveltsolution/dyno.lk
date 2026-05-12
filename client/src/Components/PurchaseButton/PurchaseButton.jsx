import React, { useState } from "react";
import { createPortal } from "react-dom"; // <--- IMPORT THIS
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import { getImageUrl } from "../../Utils/config";
import "./PurchaseButton.css";

export default function PurchaseButton({ item, itemType = "electrical" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const hasPrice = item.price > 0;
  const displayPrice = hasPrice ? `LKR ${item.price.toLocaleString()}` : "";
  const displayTotal = hasPrice
    ? `LKR ${(item.price * quantity).toLocaleString()}`
    : "";
  const buttonLabel = itemType === "electrical" ? "Inquiry" : "Buy Now";

  const handleAddToCart = () => {
    addToCart({
      _id: item._id,
      title: item.title || item.name,
      price: item.price,
      quantity,
      images: item.images || item.image || [],
      type: itemType,
    });
    setIsModalOpen(false);
    setQuantity(1);
  };

  // Define the Modal JSX separately
  const modalContent = (
    <div
      className="purchase-modal-overlay"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Quantity</h3>
          <button
            className="modal-close"
            onClick={() => {
              setIsModalOpen(false);
              setQuantity(1);
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="item-preview">
            {item.images?.[0] ? (
              <img
                src={getImageUrl(item.images[0])}
                alt={item.title || item.name}
                className="item-image"
              />
            ) : (
              <div className="item-image-placeholder">No image</div>
            )}
            <div className="item-info">
              <h4>{item.title || item.name}</h4>
              {hasPrice ? (
                <p className="item-price">{displayPrice}</p>
              ) : (
                <p className="item-price quotation-text">Quotation requested</p>
              )}
            </div>
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {hasPrice && (
            <div className="total-price">
              <span>Total:</span>
              <span className="price-value">{displayTotal}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="modal-cancel-btn"
            onClick={() => {
              setIsModalOpen(false);
              setQuantity(1);
            }}
          >
            Cancel
          </button>
          <button className="modal-add-btn" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="purchase-btn"
        onClick={() => setIsModalOpen(true)}
        title="Add to cart"
      >
        <ShoppingCart size={18} />
        <span>{buttonLabel}</span>
      </button>

      {/* RENDER PORTAL ONLY IF OPEN */}
      {isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}
