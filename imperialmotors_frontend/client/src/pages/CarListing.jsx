import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import CarItem from "../components/UI/CarItem";
import "../styles/car-listing.css";

const CarListing = () => {
  const [carData, setCarData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    // Fetch car data from backend API
    fetch("http://localhost:5000/api/cars/sendcar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update carData state with fetched data
        setCarData(data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const carsByBrand = {};
  carData.forEach((car) => {
    const { brand } = car;
    if (!carsByBrand[brand]) {
      carsByBrand[brand] = [];
    }
    carsByBrand[brand].push(car);
  });

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value); // Update selected brand when dropdown value changes
  };

  return (
    <Helmet title="Cars">
      <div className="cars">
        <div className="cars__wrapper">
          <div className="filter__widget-wrapper">
            <div className="filter__widget-01">
              <label>Select Car Brand:</label>
              <select value={selectedBrand} onChange={handleBrandChange}>
                <option value="All">All Brands</option>
                {/* Map through unique car brands and render options */}
                {Array.from(new Set(carData.map((car) => car.brand))).map(
                  (brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/*  <section>
        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left text-white">
                  <h2>Best car for you</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
*/}
      {/* =========== car offer section ============= */}
      <section className="car-container">
        <Container >
          {Object.entries(carsByBrand).map(([brand, cars]) => {
            // Only render cars for the selected brand
            if (selectedBrand !== "All" && brand !== selectedBrand) {
              return null; // Skip rendering if brand doesn't match selectedBrand
            }

            // Create a Set to store unique car names for the current brand
            const uniqueCarNames = new Set();

            return (
              <Row key={brand}>
                <Col lg="12" className="text-center mb-3">
                  <h3>{brand}</h3>
                </Col>
                {/* Map through each car of the current brand */}
                {cars
                  .slice(0, 12) // Limit to 12 cars
                  .filter((car) => {
                    // Filter out cars with repeated names
                    if (!uniqueCarNames.has(car.name)) {
                      uniqueCarNames.add(car.name); // Add name to the Set if not already present
                      return true; // Include the car in the rendered list
                    }
                    return false; // Exclude the car from the rendered list
                  })
                  .map((car) => (
                    <CarItem item={car} key={car.id} />
                  ))}
              </Row>
            );
          })}
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
