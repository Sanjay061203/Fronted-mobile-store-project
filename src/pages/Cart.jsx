import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Coupon state
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  // Apply coupon
  function handleApplyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      alert("Please enter a coupon code!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (code === "FIRST500") {
      setDiscount(500);
      setAppliedCoupon("FIRST500 (₹500 Flat OFF)");

      alert("🎉 Coupon Applied: ₹500 Discount!");
    } else if (code === "FESTIVE10") {
      const tenPercent = Math.round(subtotal * 0.1);

      setDiscount(tenPercent);
      setAppliedCoupon("FESTIVE10 (10% OFF)");

      alert(`🎉 Coupon Applied: ₹${tenPercent} Discount!`);
    } else {
      setDiscount(0);
      setAppliedCoupon("");

      alert(
        "❌ Invalid Coupon Code!\n\nTry:\nFIRST500\nFESTIVE10"
      );
    }
  }

  // Final amount after discount
  const finalTotal = Math.max(0, subtotal - discount);

  // Clear cart
  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());

      setCoupon("");
      setDiscount(0);
      setAppliedCoupon("");
    }
  }

  // Checkout
  async function handleCheckout() {
    // Check login
    if (!user) {
      alert("Please login to place an order!");
      navigate("/login");
      return;
    }

    // Prevent empty orders
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrder = {
      userId: user.id,
      userName: user.name,

      // Save cart items
      items: cartItems,

      // Price information
      subtotal: subtotal,
      discountApplied: discount,
      couponCode: appliedCoupon
        ? coupon.trim().toUpperCase()
        : "",
      totalAmount: finalTotal,

      // Order information
      orderDate: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),

      status: "Processing",
    };

    try {
      await api.post("/orders", newOrder);

      alert("🎉 Order Placed Successfully!");

      // Clear Redux cart
      dispatch(clearCart());

      // Clear coupon state
      setCoupon("");
      setDiscount(0);
      setAppliedCoupon("");

      // Go to orders page
      navigate("/orders");
    } catch (error) {
      console.error("Order failed:", error);

      alert(
        "❌ Failed to place order.\n\nPlease check that JSON Server is running."
      );
    }
  }

  return (
    <div className="cart-container">
      <h1 className="page-title">🛒 Shopping Cart</h1>

      {/* ================= EMPTY CART ================= */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>

          <p>
            Add products to your cart from the Mobiles page.
          </p>

          <button
            className="checkout-btn"
            onClick={() => navigate("/mobiles")}
          >
            Browse Mobiles
          </button>
        </div>
      ) : (
        <div className="cart-layout">

          {/* ================= CART ITEMS ================= */}
          <div className="cart-items">

            {cartItems.map((item) => (
              <div key={item.id} className="cart-card">

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                />

                {/* Product Details */}
                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>
                    Brand: {item.brand}
                  </p>

                  <p>
                    Price: ₹
                    {Number(item.price).toLocaleString("en-IN")}
                  </p>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.id)
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity(item.id)
                        )
                      }
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* Item Total */}
                <div className="cart-item-total">

                  <p>
                    Subtotal: ₹
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString("en-IN")}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              className="clear-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="cart-summary">

            <h3>Order Summary</h3>

            {/* Total Items */}
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>

            {/* Coupon */}
            <div className="coupon-box">

              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) =>
                  setCoupon(e.target.value)
                }
              />

              <button onClick={handleApplyCoupon}>
                Apply
              </button>

            </div>

            <p className="coupon-help">
              Try: <strong>FIRST500</strong> or{" "}
              <strong>FESTIVE10</strong>
            </p>

            {/* Applied Coupon */}
            {appliedCoupon && (
              <p className="coupon-applied-tag">
                ✅ Coupon: {appliedCoupon}
              </p>
            )}

            {/* Subtotal */}
            <div className="summary-row">
              <span>Subtotal:</span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount:</span>

                <span>
                  - ₹{discount.toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {/* Final Total */}
            <div className="summary-row total">

              <strong>Total Amount:</strong>

              <strong>
                ₹{finalTotal.toLocaleString("en-IN")}
              </strong>

            </div>

            {/* Checkout */}
            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

