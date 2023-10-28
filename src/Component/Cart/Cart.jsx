import React, { useCallback, useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Cart() {
  const egp = new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    currencyDisplay: "symbol",
  });

  let { getUserCart, removeFromCart, updateCount } = useContext(cartContext);
  const [productsCart, setproductsCart] = useState(null);
  const [err, setErr] = useState(false);
  async function updateProductCount(id, count) {
    let { data } = await updateCount(id, count);
    setproductsCart(data);
  }

  async function removeProduct(id) {
    let { data } = await removeFromCart(id);
    setproductsCart(data);
  }

  const getLogedCard = useCallback(async () => {
    let res = await getUserCart();
    if (res.status === 200) {
      setproductsCart(res.data);
    } else {
      console.log("error");
      setErr(res.response.data.statusMsg);
    }

    console.log(res);
  }, [getUserCart]);

  useEffect(() => {
    getLogedCard();
  }, [getLogedCard]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Cart</title>
      </Helmet>
      {err === "fail" ? (
        <div className="w-75 mx-auto bg-main-light mt-5 p-3">
          <h2 className="my-3">Shopping Cart</h2>
          <h4 className="h6 text-main fw-bolder">
            No items yet go to products to add 😊
          </h4>
        </div>
      ) : (
        <>
          {productsCart ? (
            <div className="w-75 mx-auto bg-main-light mt-5 p-3">
              <h2 className="my-3">Shopping Cart</h2>
              <h4 className="h6 text-main fw-bolder">
                Total Products : {productsCart.numOfCartItems}
              </h4>
              <h4 className="h6 text-main fw-bolder">
                Total Price : {egp.format(productsCart.data.totalCartPrice)}
              </h4>
              <div className="mt-4">
                {productsCart.data.products.map((product) => (
                  <div
                    key={product._id}
                    className="row w-100 border-bottom border-2 mb-2"
                  >
                    <div className="col-md-1 my-2 ps-2 p-1">
                      <img
                        className="w-100"
                        src={product.product.imageCover}
                        alt={product.product.title}
                      />
                    </div>
                    <div className="col-md-11 d-flex align-items-center justify-content-between">
                      <div className="d-flex justify-content-center w-75 flex-column">
                        <h2 className="h5">{product.product.title}</h2>
                        <span className="text-main fw-bolder">
                          Product Price : {product.price} EGP
                        </span>
                        <div className="d-flex flex-row align-items-center mt-4">
                          <button
                            onClick={() => removeProduct(product.product._id)}
                            className="btn p-0"
                          >
                            <i className="text-main fas fa-trash-can my-2 me-2"></i>
                          </button>
                          <span>Remove From Cart</span>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            updateProductCount(
                              product.product._id,
                              product.count + 1
                            );
                          }}
                          className="btn border-main p-1 me-2 fs-5"
                        >
                          +
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() =>
                            updateProductCount(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="btn border-main p-1 ms-2 fs-5"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  to={"/address"}
                  className="btn m-3 bg-main text-white w-25"
                >
                  Online payment
                </Link>
                {/* <Link
                  to={"/address"}
                  className="btn m-3 bg-main text-white w-25"
                >
                  Cash on delivery
                </Link> */}
              </div>
            </div>
          ) : (
            <div className="h-100 d-flex align-items-center justify-content-center">
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Cart;

// console.log(`The formated version of ${price} is ${egp.format(price)}`);
// The formated version of 14340 is $14,340.00
