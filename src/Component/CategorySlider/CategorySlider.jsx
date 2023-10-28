import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1250,
  };
  function getCategorys() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data } = useQuery("categorySlider", getCategorys);
  return (
    <>
      <h2 className="h3 my-4">Shop Popular Categories</h2>
      <div className="py-4 mx-3">
        {data?.data.data ? (
          <Slider {...settings}>
            {data?.data.data.map((category, i) => (
              <div key={i}>
                <div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-100 cursor-pointer"
                    height={250}
                  />
                </div>
                <div key={category.name}>
                  <h3 className=" py-3 h4 text-center">{category.name}</h3>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CategorySlider;
