import React from "react";
import { Row, Col } from "reactstrap";
import "../../styles/services-list.css";
import servicesData from "../../assets/data/serviceData";

const ServicesList = () => {
  return (
    <>
      {servicesData.map((item) => (
        <ServiceItem item={item} key={item.id} />
      ))}
    </>
  );
};

const ServiceItem = ({ item }) => (
  <Row className="service__container">
    <Col xs="6" md="4" className="first__column">
      <div className="service__item">
        <span className="mb-4 d-inline-block mx-5">
          <i className={item.icon} />
        </span>
        <h6>{item.title}</h6>
      </div>
    </Col>
    <Col xs="12" md="8" className="mb-3 my-2">
      <div className="service__description">
        <p>{item.desc}</p>
      </div>
    </Col>
  </Row>
);

export default ServicesList;
