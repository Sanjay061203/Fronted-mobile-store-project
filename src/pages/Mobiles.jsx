import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import MobileCard from "../components/MobileCard";

function Mobiles() {
  const [mobiles, setMobiles] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [budget, setBudget] = useState("All");

  // Price
  const [maxPrice, setMaxPrice] = useState(200000);

  // Sorting
  const [sort, setSort] = useState("default");

  // Fetch mobiles
  useEffect(() => {
    getMobiles();
  }, []);

  async function getMobiles() {
    try {
      const response = await api.get("/mobiles");
      setMobiles(response.data);
    } catch (error) {
      console.error("Error fetching mobiles:", error);
    }
  }

  // Delete mobile
  async function deleteMobile(id) {
    try {
      await api.delete(`/mobiles/${id}`);

      setMobiles((prevMobiles) =>
        prevMobiles.filter((mobile) => mobile.id !== id)
      );
    } catch (error) {
      console.error("Error deleting mobile:", error);
    }
  }

  // Filter mobiles
  const filteredMobiles = mobiles.filter((mobile) => {
    const searchText = search.toLowerCase();

    // Search by name OR brand
    const searchMatch =
      mobile.name.toLowerCase().includes(searchText) ||
      mobile.brand.toLowerCase().includes(searchText);

    // Category
    const categoryMatch =
      category === "All" || mobile.category === category;

    // Brand
    const brandMatch =
      brand === "All" || mobile.brand === brand;

    // Budget
    const budgetMatch =
      budget === "All" || mobile.budget === budget;

    // Maximum price
    const priceMatch = Number(mobile.price) <= maxPrice;

    return (
      searchMatch &&
      categoryMatch &&
      brandMatch &&
      budgetMatch &&
      priceMatch
    );
  });

  // Create a new array before sorting
  let finalMobiles = [...filteredMobiles];

  // Price sorting
  if (sort === "lowToHigh") {
    finalMobiles.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else if (sort === "highToLow") {
    finalMobiles.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  return (
    <div className="mobiles-page-container">

      {/* ================= HEADER ================= */}
      <div className="mobiles-header">
        <div>
          <h1>📱 Mobile Collection</h1>
          <p>
            Find the perfect smartphone for your needs.
          </p>
        </div>

        <Link to="/add-mobile" className="add-btn">
          + Add Mobile
        </Link>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="advanced-filter-card">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search mobile name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Flagship">Flagship</option>
          <option value="Mid-Range">Mid-Range</option>
          <option value="Budget">Budget</option>
        </select>

        {/* Brand */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="All">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="OnePlus">OnePlus</option>
          <option value="Google">Google</option>
          <option value="iQOO">iQOO</option>
          <option value="Nothing">Nothing</option>
          <option value="Vivo">Vivo</option>
          <option value="Realme">Realme</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Motorola">Motorola</option>
          <option value="POCO">POCO</option>
        </select>

        {/* Budget */}
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="All">All Budgets</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Price Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By Price</option>
          <option value="lowToHigh">
            Price: Low to High
          </option>
          <option value="highToLow">
            Price: High to Low
          </option>
        </select>

        {/* Maximum Price */}
        <div className="price-slider-group">

          <label>
            Max Price: ₹
            {maxPrice.toLocaleString("en-IN")}
          </label>

          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Number(e.target.value))
            }
          />

        </div>
      </div>

      {/* ================= RESULT COUNT ================= */}
      <div className="results-info">
        <p>
          Showing <strong>{finalMobiles.length}</strong>{" "}
          mobile{finalMobiles.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="card-grid">

        {finalMobiles.length > 0 ? (
          finalMobiles.map((mobile) => (
            <MobileCard
              key={mobile.id}
              mobile={mobile}
              onDelete={deleteMobile}
            />
          ))
        ) : (
          <div className="no-results">
            <h2>No mobiles found</h2>
            <p>
              Try changing your search or filter options.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Mobiles;

