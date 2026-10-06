import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Background pattern kosam 15 dummy mobile items
  const backgroundMobiles = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Mobile ${i + 1}`,
    image: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80`
  }));

  return (
    <div className="home-wrapper">
      {/* Background 15 Mobile Grid Pattern */}
      <div className="bg-mobile-grid">
        {backgroundMobiles.map((phone) => (
          <div key={phone.id} className="bg-mobile-card">
            <img src={phone.image} alt={phone.name} />
            <span>{phone.name}</span>
          </div>
        ))}
      </div>

      {/* Dark Overlay for clear text reading */}
      <div className="home-overlay"></div>

      {/* Foreground Main Content */}
      <div className="home-content">
        <div className="hero-banner">
          <h1>Welcome to Mobile Store {user ? `, ${user.name}` : ""}!</h1>
          <p>Discover top-rated smartphones, flagship devices, and exclusive deals today.</p>
          <Link to="/mobiles" className="explore-btn">
            Explore Mobiles
          </Link>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🚀 Fast Delivery</h3>
            <p>Get your smartphones delivered to your doorstep in 24 hours.</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ 1 Year Warranty</h3>
            <p>All brand new mobiles come with official brand warranty.</p>
          </div>
          <div className="feature-card">
            <h3>💳 Easy EMI Options</h3>
            <p>No-cost EMI available on all major credit and debit cards.</p>
          </div>
        </div>

        <div className="home-categories">
          <h2>Top Categories</h2>
          <div className="category-cards">
            <div className="cat-card">
              <h4>Flagship Phones</h4>
              <p>Ultimate performance & premium design</p>
            </div>
            <div className="cat-card">
              <h4>Mid-Range Champions</h4>
              <p>Best value for money devices</p>
            </div>
            <div className="cat-card">
              <h4>Budget Friendly</h4>
              <p>Essential features at minimal cost</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;