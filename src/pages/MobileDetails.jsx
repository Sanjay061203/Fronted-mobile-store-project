import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function MobileDetails() {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    getMobile();
  }, []);

  async function getMobile() {
    try {
      const response = await api.get(`/mobiles/${id}`);
      setMobile(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!mobile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img src={mobile.image} alt={mobile.name} />
      <h1>{mobile.name}</h1>
      <p>{mobile.description}</p>

      <h3>Brand</h3>
      <p>{mobile.brand}</p>

      <h3>Category</h3>
      <p>{mobile.category}</p>

      <h3>Release Year</h3>
      <p>{mobile.releaseYear}</p>

      <h3>Warranty</h3>
      <p>{mobile.warranty}</p>

      <h3>Battery</h3>
      <p>{mobile.battery}</p>

      <h3>Processor</h3>
      <p>{mobile.processor}</p>

      <h3>Currency</h3>
      <p>{mobile.currency}</p>

      <h3>Price</h3>
      <p>₹{mobile.price}</p>

      <h3>Rating</h3>
      <p>⭐ {mobile.rating}</p>

      <h3>Famous For</h3>
      <p>{mobile.famousFor}</p>

      <h3>Top Features</h3>
      <ul>
        {mobile.features?.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default MobileDetails;