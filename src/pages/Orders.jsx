import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/orders?userId=${user?.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  return (
    <div className="orders-container">
      <h1>📦 My Order History</h1>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Found!</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <p className="order-id">Order ID: #{order.id}</p>
                  <p className="order-date">Date: {order.orderDate}</p>
                </div>
                <span className={`status-tag ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p>Brand: {item.brand}</p>
                      <p>
                        ₹{item.price?.toLocaleString("en-IN")} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span>Total Amount Paid:</span>
                <strong>₹{order.totalAmount?.toLocaleString("en-IN")}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;