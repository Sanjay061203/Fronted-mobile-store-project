import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";
import { addToCart } from "../features/cartSlice";

function MobileCard({ mobile, onDelete }) {
  const dispatch = useDispatch();

  function handleFavorite() {
    dispatch(addFavorite(mobile));
  }

  function handleAddToCart() {
    dispatch(addToCart(mobile));
  }

  function handleDelete() {
    if (window.confirm(`Are you sure you want to delete ${mobile.name}?`)) {
      onDelete(mobile.id);
    }
  }

  return (
    <div
      className="card"
      style={{
        position: "relative",
      }}
    >
      {/* Category Badge */}
      <span
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          background: "#4338ca",
          color: "white",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 1,
        }}
      >
        {mobile.category}
      </span>

      {/* Mobile Image */}
      <img src={mobile.image} alt={mobile.name} />

      {/* Mobile Name */}
      <h3>{mobile.name}</h3>

      {/* Brand */}
      <p>{mobile.brand}</p>

      {/* Rating */}
      <div
        style={{
          color: "#f59e0b",
          margin: "5px 0",
        }}
      >
        {"★".repeat(Math.round(mobile.rating))}
        <span
          style={{
            color: "#64748b",
            marginLeft: "5px",
          }}
        >
          ({mobile.rating})
        </span>
      </div>

      {/* Price */}
      <p>
        <strong>
          ₹{Number(mobile.price).toLocaleString("en-IN")}
        </strong>
      </p>

      {/* Cart & Favorite Buttons */}
      <div className="card-buttons">
        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

        <button
          className="favorite-btn"
          onClick={handleFavorite}
        >
          Favorite
        </button>
      </div>

      {/* View, Edit & Delete */}
      <div className="card-actions">
        <Link
          className="view-btn"
          to={`/mobiles/${mobile.id}`}
        >
          View
        </Link>

        <Link
          className="edit-btn"
          to={`/edit-mobile/${mobile.id}`}
        >
          Edit
        </Link>

        {onDelete && (
          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileCard;

