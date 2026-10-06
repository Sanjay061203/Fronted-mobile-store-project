import { useState, useEffect } from "react";
import api from "../services/api";

function Reviews({ mobileId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch reviews for this mobile
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await api.get(`/reviews?mobileId=${mobileId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, [mobileId]);

  // Handle Review Submission
  async function handleSubmitReview(e) {
    e.preventDefault();

    if (!user) {
      alert("Please login to write a review!");
      return;
    }

    const newReview = {
      mobileId,
      userId: user.id,
      userName: user.name,
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString("en-IN")
    };

    try {
      const response = await api.post("/reviews", newReview);
      setReviews([...reviews, response.data]);
      setComment("");
      alert("⭐ Thank you for your review!");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  }

  return (
    <div className="reviews-section">
      <h3>💬 Customer Reviews & Ratings</h3>

      {/* Add Review Form */}
      <form onSubmit={handleSubmitReview} className="review-form">
        <h4>Write a Review</h4>
        <div className="rating-select">
          <label>Rating: </label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
            <option value="4">⭐⭐⭐⭐ (4/5 Very Good)</option>
            <option value="3">⭐⭐⭐ (3/5 Good)</option>
            <option value="2">⭐⭐ (2/5 Average)</option>
            <option value="1">⭐ (1/5 Poor)</option>
          </select>
        </div>

        <textarea
          placeholder="Share your experience about this mobile..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit" className="review-submit-btn">
          Submit Review
        </button>
      </form>

      {/* Reviews Display List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-header">
                <strong>{rev.userName}</strong>
                <span className="review-stars">
                  {"★".repeat(rev.rating)}
                </span>
              </div>
              <p className="review-comment">{rev.comment}</p>
              <small className="review-date">{rev.date}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;