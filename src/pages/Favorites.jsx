import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="favorites-container">
      <h1 className="page-title">Favorite Mobiles</h1>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No Favorite Mobiles</h2>
          <p>Add mobiles from the Mobiles page.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((mobile) => (
            <div key={mobile.id} className="favorite-card">
              <img src={mobile.image} alt={mobile.name} />
              <div className="favorite-content">
                <h2>{mobile.name}</h2>
                <p>{mobile.brand}</p>
                <p>⭐ {mobile.rating}</p>
                <p>{mobile.budget}</p>
                <button onClick={() => dispatch(removeFavorite(mobile.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;