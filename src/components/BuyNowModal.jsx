import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BuyNowModal({ mobile, onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  if (!mobile) return null;

  async function handleConfirmOrder(e) {
    e.preventDefault();

    if (!user) {
      alert("Please login to place an order!");
      navigate("/login");
      return;
    }

    const quickOrder = {
      userId: user.id,
      userName: user.name,
      items: [{ ...mobile, quantity: 1 }],
      totalAmount: mobile.price,
      shippingAddress: address,
      paymentMethod,
      orderDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      status: "Processing"
    };

    try {
      await api.post("/orders", quickOrder);
      alert("🎉 Quick Order Placed Successfully!");
      onClose();
      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order.");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>⚡ Quick Checkout</h2>
        <div className="modal-item-info">
          <img src={mobile.image} alt={mobile.name} />
          <div>
            <h3>{mobile.name}</h3>
            <p><strong>Price:</strong> ₹{mobile.price?.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <form onSubmit={handleConfirmOrder}>
          <textarea
            placeholder="Enter Delivery Address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="UPI">UPI / Google Pay / PhonePe</option>
            <option value="Card">Credit / Debit Card</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyNowModal;