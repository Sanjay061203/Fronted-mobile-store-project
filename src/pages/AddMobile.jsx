import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddMobile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    image: "",
    description: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/mobiles", formData);
    navigate("/mobiles");
  }

  return (
    <div className="form-container">
      <h2>Add Mobile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <button className="submit-btn">Add Mobile</button>
      </form>
    </div>
  );
}

export default AddMobile;