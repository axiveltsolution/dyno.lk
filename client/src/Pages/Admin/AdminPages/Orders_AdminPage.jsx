// src/Pages/Admin/AdminPages/Orders_AdminPage.jsx
import React, { useState, useEffect } from "react";
import { Eye, Edit2, Trash2, ChevronDown } from "lucide-react";
import "../admin.global.css";
import "./Orders_AdminPage.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

const Orders_AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        page,
        limit,
        ...(statusFilter && { status: statusFilter }),
      });

      const res = await fetch(`${API_BASE}/orders/admin?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setPages(data.pages || 1);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      const data = await res.json();

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data.order : order)),
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder(data.order);
      }
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Cancel this order? This action cannot be undone."))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      setSelectedOrder(null);
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to cancel order");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#fbbf24",
      confirmed: "#3b82f6",
      shipped: "#8b5cf6",
      delivered: "#10b981",
      cancelled: "#ef4444",
    };
    return colors[status] || "#6b7280";
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Orders Management</h1>
        <p>Manage all customer orders and track shipments</p>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <label>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="status-filter-select"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <div className="orders-loading">Loading orders...</div>}

      {/* Error State */}
      {error && <div className="orders-error">{error}</div>}

      {/* Orders Table */}
      {!loading && !error && orders.length > 0 && (
        <div className="orders-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="order-number">{order.orderNumber}</td>
                  <td>{order.customer.name}</td>
                  <td className="email-cell">{order.customer.email}</td>
                  <td className="price">
                    Rs. {order.totalPrice?.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions">
                    <button
                      className="action-btn view-btn"
                      onClick={() => setSelectedOrder(order)}
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteOrder(order._id)}
                      title="Cancel order"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {pages > 1 && (
            <div className="orders-pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {page} of {pages}
              </span>
              <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && orders.length === 0 && (
        <div className="orders-empty">No orders found</div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              {/* Order Header */}
              <div className="order-info-section">
                <div className="info-row">
                  <label>Order Number:</label>
                  <span className="highlight">{selectedOrder.orderNumber}</span>
                </div>
                <div className="info-row">
                  <label>Order Date:</label>
                  <span>
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-row">
                  <label>Total Amount:</label>
                  <span className="price-highlight">
                    Rs. {selectedOrder.totalPrice?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status Update */}
              <div className="status-update-section">
                <label>Update Status:</label>
                <div className="status-buttons">
                  {[
                    "pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      className={`status-update-btn ${
                        selectedOrder.status === status ? "active" : ""
                      }`}
                      onClick={() =>
                        handleStatusUpdate(selectedOrder._id, status)
                      }
                      style={{
                        borderColor: getStatusColor(status),
                        color: getStatusColor(status),
                        backgroundColor:
                          selectedOrder.status === status
                            ? getStatusColor(status)
                            : "transparent",
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="order-section">
                <h3>Customer Information</h3>
                <div className="info-grid">
                  <div>
                    <label>Name:</label>
                    <p>{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <label>Email:</label>
                    <p>{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <label>Phone:</label>
                    <p>{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <label>Address:</label>
                    <p>{selectedOrder.customer.address}</p>
                  </div>
                </div>
                {selectedOrder.customer.notes && (
                  <div className="notes">
                    <label>Notes:</label>
                    <p>{selectedOrder.customer.notes}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="order-section">
                <h3>Order Items ({selectedOrder.items?.length || 0})</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.title}</td>
                        <td>{item.itemType}</td>
                        <td className="center">{item.quantity}</td>
                        <td>Rs. {item.price?.toLocaleString()}</td>
                        <td>
                          Rs. {(item.price * item.quantity)?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  handleDeleteOrder(selectedOrder._id);
                  setSelectedOrder(null);
                }}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders_AdminPage;
