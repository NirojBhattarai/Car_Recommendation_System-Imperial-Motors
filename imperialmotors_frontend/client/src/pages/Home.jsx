import React from "react";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
const Home = () => {
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <div className="p-0 hero__slider-section">
        <HeroSlider />
      </div>
    </Helmet>
  );
};

export default Home;
