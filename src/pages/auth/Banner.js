import React from "react";
import TestaLogo from "../../assets/images/common/testa-logo.png";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../../config/constants/routePathConstants";

function Banner() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div className="line-dots"></div>,
  };
  return (
    <div className="login-banner">
      <div className="login-logo">
        <img onClick={() => navigate(SIGNIN)} src={TestaLogo} alt="logo" />
      </div>
      <div className="login-slide-container">
        <Slider {...settings}>
          {[1, 2, 3]?.map((item) => (
            <div className="login-slide" key={item}>
              <h3>Get Better Talent Assessment Now</h3>
              <p>
                From Instinct to Insights : Make Powerful and Precise People
                Decisions
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Banner;
