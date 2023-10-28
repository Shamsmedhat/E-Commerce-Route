import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Bars, FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { ConterContext } from "../../Context/CounterContext";

function Featuredproducts() {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // async function getFeaturedProducts() {
  //   setIsLoading(true);
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   console.log(data.data);
  //   setProducts(data.data);
  //   setIsLoading(false);
  // }
  // useEffect(() => {
  //   getFeaturedProducts();
  // }, []);
  const { addToCart } = useContext(cartContext);
  const { addToWishList, wishlist, getWishlist } = useContext(ConterContext);
  const [loadingCart, setLoadingCart] = useState(false);

  async function addProduct(productId) {
    setLoadingCart(true);
    let res = await addToCart(productId);
    if (res.data.status === "success") {
      toast.success("The product was added successfully to your cart👏👌 ");
      setLoadingCart(false);
    } else {
      toast.error("Something wrong ,please try to add again 🫡");
    }
  }

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading, refetch } = useQuery(
    "featuredProducts",
    getFeaturedProducts,
    {
      cacheTime: 120000,
      refetchOnMount: true, //defult value
      //enabled //defult true can use it in button by useing refetch
      // refetchInterval:60000  //fech new data every ....
      //staleTime //old data display time
    }
  );
  useEffect(() => {
    getWishlist();
  }, [getWishlist, wishlist]);

  function handleClick(e, productId) {
    e.preventDefault();
    addToWishList(productId);
    refetch();
    if (wishlist?.data?.status === "success") {
      toast.success("The product was added successfully to your wish ");
    } else {
      toast.error("Something wrong ,please try to add again 🫡");
    }
  }

  return (
    <>
      <div className="container-fluid px-5 py-2">
        <div className="row">
          <h2>Featured Products</h2>
          {isLoading ? (
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
          ) : (
            data?.data.data.map((product) => (
              <div
                key={product._id}
                className="col-md-2 product cursor-pointer gx-4 gy-4"
              >
                <Link to={`/productdetails/${product._id}`}>
                  <div className=" p-2">
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <div className="d-flex justify-content-between">
                      <h3 className="h5">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <button
                        className="btn"
                        onClick={(e) => handleClick(e, product._id)}
                      >
                        {/* <i className="fa-regular fa-heart text-main fs-4"></i> */}
                        <i
                          className={`${
                            wishlist?.data?.data.find(
                              (el) => el.id === product._id
                            )
                              ? "fa-solid fa-heart text-main fs-4"
                              : "fa-regular fa-heart text-main fs-4"
                          }`}
                        ></i>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>{product.price} EGP</span>
                      <span>
                        {product.ratingsAverage}
                        <i className="fas fa-star rating-color"></i>
                      </span>
                    </div>
                  </div>
                </Link>
                {loadingCart ? (
                  <button
                    disabled
                    className="btn bg-main text-white w-100 btn-sm mt-2 notAllow"
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
                    onClick={() => addProduct(product._id)}
                    className="btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    Add To Card
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Featuredproducts;
