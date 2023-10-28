import React from "react";
import Featuredproducts from "../Featuredproducts/Featuredproducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
      </Helmet>
      <div className="container-fluid">
        <MainSlider />
        <CategorySlider />
      </div>
      <Featuredproducts />
    </>
  );
}

export default Home;
