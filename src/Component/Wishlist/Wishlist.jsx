import React, { useContext, useEffect } from "react";
import { ConterContext } from "../../Context/CounterContext";
import { Bars } from "react-loader-spinner";

function Wishlist() {
  let { getWishlist, wishlist, removeFromWishList, loading } =
    useContext(ConterContext);
  useEffect(() => {
    getWishlist();
  }, [getWishlist]);
  return (
    <>
      <div className="w-75 mx-auto bg-main-light mt-5 p-3">
        <h2 className="my-3">Your wish list</h2>
        <div className="mt-4 container ">
          <div className="row ">
            {loading ? (
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
              <>
                {wishlist?.data?.data.map((item, i) => (
                  <div className="col-md-3 " key={i}>
                    <div className="card text-center d-flex flex-column justify-content-center align-items-center p-3">
                      <img
                        className="w-100"
                        src={item?.imageCover}
                        alt={item?.title}
                      />

                      <h3>{item?.title?.split(" ").slice(0, 2).join(" ")}</h3>
                      <p>
                        {item?.description?.split(" ").slice(0, 4).join(" ")}
                      </p>
                      <button
                        className="btn m-3 btn-outline-danger text-red  w-50"
                        onClick={() => removeFromWishList(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
