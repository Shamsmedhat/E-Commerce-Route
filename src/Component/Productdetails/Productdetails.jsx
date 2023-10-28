import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
function Productdetails() {
  const [isLoading, setIsLoading] = useState(false);
  let { data } = useQuery("productDetails", () => getProductDetails(params.id));
  let params = useParams();

  let { addToCart } = useContext(cartContext);

  async function addProduct(id) {
    setIsLoading(true);
    let res = await addToCart(id);
    if (res.data.status === "success") {
      toast.success("The product was added successfully to your cart👏👌 ");
      setIsLoading(false);
    } else {
      toast.error("Something wrong ,please try to add again 🫡");
    }
  }
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let productData = data?.data.data;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{productData?.title}</title>
      </Helmet>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <img
              className="w-100"
              src={productData?.imageCover}
              alt={productData?.title}
            />
          </div>
          <div className=" col-md-8 d-flex align-items-center justify-content-center flex-column">
            <h2 className="h4 w-100">{productData?.title}</h2>
            <p className="w-100">{productData?.description}</p>
            <p className="w-100 text-main fw-bolder">
              {productData?.category.name}
            </p>
            <div className="w-100 d-flex align-items-center justify-content-between">
              <span className="text-main fw-bolder">
                {productData?.price} EGP
              </span>
              <span>
                {productData?.ratingsAverage}
                <i className="fas fa-star rating-color"></i>
              </span>
            </div>
            {isLoading ? (
              <button
                disabled
                className="btn w-100 btn-sm bg-main text-white mt-3 py-2 notAllow"
              >
                <FallingLines
                  color="#fff"
                  width="20"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </button>
            ) : (
              <button
                onClick={() => addProduct(productData?._id)}
                className="btn w-100 btn-sm bg-main text-white mt-3 py-2  "
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Productdetails;
