import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/services",
    display: "Services",
  },
];

const Header = () => {
  const location = useLocation();
  const menuRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [carListWidth, setCarListWidth] = useState(0);
  const [carData, setCarData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  useEffect(() => {
    const filterCars = (term) => {
      if (!term) {
        setFilteredCars([]);
      } else {
        const filtered = carData.filter((car) =>
          car.brand.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCars(filtered);
        console.log(filteredCars)
      }
    };

    filterCars(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm, carData]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cars/sendcar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCarData(data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, []);

  useEffect(() => {
    const boxWidth = searchBoxRef.current?.offsetWidth;
    if (boxWidth) {
      setCarListWidth(boxWidth);
    }
  }, [searchTerm]);

 

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/sign_in" className="d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line"></i>Login
                </Link>
                <Link to="/sign_in" className="d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i>Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                      Imperial <br /> Motors
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>
            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Nepal</h4>
                  <h6>Jhapa, Nepal</h6>
                </div>
              </div>
            </Col>
            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>6AM - 10PM</h6>
                </div>
              </div>
            </Col>
            <Col
              lg="2"
              md="3"
              sm="0"
              className={`d-flex align-items-center justify-content-end ${
                location.pathname === "/cars" ? "nav_right" : ""
              }`}
            >
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i>{" "}
                  <strong>Request a call</strong>
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line text-white" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
            {location.pathname === "/cars" && (
              <div className="nav_right">
                <form action="submit">
                  <div ref={searchBoxRef} className="search__box">
                    <input
                      onClick={toggleMenu}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      name="search"
                      id="search"
                      placeholder=" Type to Search"
                    />
                    <span>
                      <i className="ri-search-line"></i>
                    </span>
                  </div>

                  {searchTerm && (
                    <div
                      className="car__listings"
                      style={{ width: carListWidth }}
                    >
                      <ul>
                        {filteredCars.map((car) => (
                          <li key={car.car_id} >
                            <Link to={`/cars/${encodeURIComponent(car.car_id)}`}>
                              {car.brand} {car.name} ({car.model})
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
