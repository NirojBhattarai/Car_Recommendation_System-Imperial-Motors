import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import CarItem from "../components/UI/CarItem"; // Import the CarItem component
import "../styles/car-details.css";

const CarDetails = () => {
  const { car_id } = useParams();
  const [car, setCar] = useState({});
  const [recommendedCars, setRecommendedCars] = useState([]);

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/sendcar/${car_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCar(data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });

    fetch(`http://localhost:5000/api/recommendcars/${car_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecommendedCars(data);
      })
      .catch((error) => {
        console.error("Error fetching recommended cars:", error);
      });
  }, [car_id]);

  return (
    <Helmet title="Cars">
      <div className="car-details-container">
        <Container>
          <Row className="car-details-row">
            <Col xs="12" md="6" className="car-details-content">
              <h2>{car.name}</h2>
              <p>Brand: {car.brand}</p>
              <p>Model: {car.model}</p>
              <p>Fuel Efficiency: {car.fuelEfficiency}</p>
              <p>Comfort Level: {car.comfortLevel}</p>
              <p>Price: ${car.price}</p>
              <button onClick={handleGoBack} className="back-button">
                <i className="fas fa-arrow-left"></i> Back
              </button>
            </Col>
            <Col xs="12" md="6" className="car-details-image">
              <img src={car.image} alt={car.name} />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container className="recommender-cars">
          <Row className="recommended-cars-row">
            <Col>
              <h3>Recommended Cars</h3>
              {recommendedCars.length > 0 ? (
                <Row>
                  {/* Render each recommended car using the CarItem component */}
                  {recommendedCars.map((recommendedCar) => (
                    <CarItem
                      key={recommendedCar.id}
                      item={recommendedCar.details}
                    />
                  ))}
                </Row>
              ) : (
                <p>No recommended cars found.</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default CarDetails;
