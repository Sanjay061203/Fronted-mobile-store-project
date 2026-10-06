import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditMobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    getMobile();
  }, []);

  async function getMobile() {
    const response = await api.get(`/mobiles/${id}`);
    setFormData(response.data);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.put(`/mobiles/${id}`, formData);
    navigate("/mobiles");
  }

  return (
    <div className="form-container">
      <h2>Edit Mobile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <button className="submit-btn">Update Mobile</button>
      </form>
    </div>
  );
}

export default EditMobile;