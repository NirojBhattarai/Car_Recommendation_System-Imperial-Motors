import React, { useState } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { car_id, model, name, fuelEfficiency, comfortLevel, price, image } = props.item;
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className={`car__img ${imageLoaded ? "loaded" : "loading"}`}>
          <img
            src={image}
            alt=""
            className="w-100"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="loading-text">Loading...</div>}
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">
            {name.length > 15 ? `${name.substring(0, 19)}` : name}
          </h4>
          <h6 className="rent__price text-center mt-">
            ${price}
            <span>/Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-gas-station-line"></i>
              {fuelEfficiency}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-wheelchair-fill"></i>
              {comfortLevel}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${encodeURIComponent(car_id)}`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${encodeURIComponent(car_id)}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
