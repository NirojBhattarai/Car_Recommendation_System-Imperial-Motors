import React, { useState } from "react";
import "../styles/addcar.css";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    model: "",
    year: "",
    fuelEfficiency: "",
    comfortLevel: "",
    price: "",
    image: null, 
    description: ""
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // Handle file input separately
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      // For other input fields, set value directly
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("year", formData.year);
      formDataToSend.append("fuelEfficiency", formData.fuelEfficiency);
      formDataToSend.append("comfortLevel", formData.comfortLevel);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image); // Append image data
      formDataToSend.append("description", formData.description);

      const response = await fetch("http://localhost:5000/api/addcar/addcar", {
        method: "POST",
        body: formDataToSend
      });

      if (response.ok) {
        alert("Car added successfully!");
        // Reset form data
        setFormData({
          brand: "",
          name: "",
          model: "",
          year: "",
          fuelEfficiency: "",
          comfortLevel: "",
          price: "",
          image:null,
          description: ""
        });
      } else {
        throw new Error("Failed to add car");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add car");
    }
  };

  return (
    <div className="addcars">
      <h2 className="addcar_title">Add Car Details</h2>
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuelEfficiency">Fuel Efficiency:</label>
          <input
            type="number"
            id="fuelEfficiency"
            name="fuelEfficiency"
            value={formData.fuelEfficiency}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comfortLevel">Comfort Level:</label>
          <input
            type="number"
            id="comfortLevel"
            name="comfortLevel"
            value={formData.comfortLevel}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCarForm;
