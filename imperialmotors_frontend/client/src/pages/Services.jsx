import React from 'react'
import ServicesList from "../components/UI/ServicesList";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

const Services = () => {
  return (
      <Helmet title="Our Services">
       {/* ========== services section ============ */}
       <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h1 className="section__title">Popular Services</h1>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>
      </Helmet>
  )
}

export default Services
