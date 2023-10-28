import React from "react";
import Slider from "react-slick";
import slid1 from "../../Assets/Images/slider-image-1.jpeg";
import slid2 from "../../Assets/Images/slider-image-2.jpeg";
import slid3 from "../../Assets/Images/slider-image-3.jpeg";
import pic1 from "../../Assets/Images/slider-2.jpeg";
import pic2 from "../../Assets/Images/grocery-banner-2.jpeg";

function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="row gx-0 mt-3">
        <div className="col-md-9 ">
          <Slider {...settings}>
            <img height={500} className="w-100" src={slid1} alt="slidOne" />
            <img height={500} className="w-100" src={slid2} alt="slidtwo" />
            <img height={500} className="w-100" src={slid3} alt="slidthree" />
          </Slider>
        </div>
        <div className="col-md-3 ">
          <img height={250} className="w-100" src={pic1} alt="slidtwo" />
          <img height={250} className="w-100" src={pic2} alt="slidthree" />
        </div>
      </div>
    </>
  );
}

export default MainSlider;
