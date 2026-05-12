import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import CheckoutModal from "./CheckoutModal";
import "./CartSidebar.css";

export default function CartSidebar() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const hasKnownPrice = cartItems.some((item) => item.price > 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowCheckout(true);
  };

  return (
    <>
      {/* Cart Icon - Fixed Position */}
      <button
        className="cart-icon-btn"
        onClick={() => setCartOpen(!cartOpen)}
        title="Shopping Cart"
      >
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span className="cart-badge">{getTotalItems()}</span>
        )}
      </button>

      {/* Portal the sidebar + overlay so they are appended to document.body */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {/* Cart Sidebar */}
            <div className={`cart-sidebar ${cartOpen ? "cart-open" : ""}`}>
              {/* Header */}
              <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button
                  className="cart-close-btn"
                  onClick={() => setCartOpen(false)}
                  title="Close cart"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Items Container */}
              <div className="cart-items-container">
                {cartItems.length === 0 ? (
                  <div className="cart-empty">
                    <ShoppingCart size={48} opacity={0.3} />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="cart-items">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item._id}-${item.type}`}
                        className="cart-item"
                      >
                        {item.coverImage || item.images?.[0] ? (
                          <img
                            src={`http://localhost:7001${
                              item.coverImage || item.images?.[0]
                            }`}
                            alt={item.title}
                            className="cart-item-image"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <div className="cart-item-no-image">No Image</div>
                        )}

                        <div className="cart-item-details">
                          <h4 className="cart-item-title">{item.title}</h4>
                          <p className="cart-item-type">
                            {item.type || item.category || "Item"}
                          </p>
                          {item.price > 0 && (
                            <p className="cart-item-price">
                              LKR {item.price.toLocaleString()}
                            </p>
                          )}

                          {/* Quantity Control */}
                          <div className="cart-quantity-control">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.type,
                                  item.quantity - 1,
                                )
                              }
                              className="qty-btn"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="qty-display">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.type,
                                  item.quantity + 1,
                                )
                              }
                              className="qty-btn"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          {item.price > 0 && (
                            <p className="cart-item-subtotal">
                              Subtotal: LKR{" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item._id, item.type)}
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="cart-footer">
                  {hasKnownPrice && (
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="total-price">
                        {`LKR ${getTotalPrice().toLocaleString()}`}
                      </span>
                    </div>
                  )}

                  <button
                    className="cart-checkout-btn"
                    onClick={handleCheckout}
                  >
                    Proceed to Inquiry
                  </button>

                  <button
                    className="cart-clear-btn"
                    onClick={() => {
                      if (window.confirm("Clear entire cart?")) {
                        clearCart();
                      }
                    }}
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Overlay */}
            <div
              className={`cart-overlay ${cartOpen ? "cart-open" : ""}`}
              onClick={() => setCartOpen(false)}
            />

            {/* Checkout Modal (rendered inside portal container to avoid stacking issues) */}
            {showCheckout && (
              <CheckoutModal
                onClose={() => setShowCheckout(false)}
                cartItems={cartItems}
                totalPrice={getTotalPrice()}
              />
            )}
          </>,
          document.body,
        )}
    </>
  );
}
