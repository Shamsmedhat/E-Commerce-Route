import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";

function Orders() {
  const orderId = localStorage.getItem("cartOwnerId");
  console.log(orderId);
  const { getUserOrders } = useContext(cartContext);
  const [oldOrders, setOldOrders] = useState(null);

  async function getAllOrders(orderId) {
    let { data } = await getUserOrders(orderId);
    setOldOrders(data);
  }
  getAllOrders(orderId);

  function formatDate(date) {
    const isoDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return isoDate.toLocaleDateString("en-US", options);
  }
  return (
    <>
      <div className="container">
        <h2 className="my-4">Your Orders history</h2>
        <div className="orders row row-cols-1 d-flex justify-content-center align-items-center borderBottom">
          {oldOrders?.map((oldOrders, i) => (
            <div key={i} className="p-0">
              <div
                key={oldOrders.id}
                className="headOrders col d-flex align-items-center justify-content-between bg-light borderCart p-3"
              >
                <div className="date">
                  <h4 className="h5">Order Placed</h4>
                  <h5 className="h6">{formatDate(oldOrders.createdAt)}</h5>
                </div>
                <div className="orderId">
                  <h5 className="h6"> Order number #{oldOrders.id}</h5>
                  <h5 className="h6">
                    {" "}
                    Total Price : {oldOrders.totalOrderPrice} EGP
                  </h5>
                </div>
              </div>
              <div className="col bodyOrders borderCartBody align-items-center justify-content-center p-3">
                {oldOrders.cartItems.map((productItem, j) => (
                  <div key={j}>
                    <div key={productItem.id} className=" w-100 row ">
                      <div className="col-md-1 ">
                        <img
                          key={productItem.product._id}
                          className="w-100"
                          src={productItem.product.imageCover}
                          alt={productItem.product.title}
                        />
                      </div>
                      <div className="col-md-7 justify-content-center d-flex flex-column">
                        <h2 className="h5">
                          {productItem.product.title
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </h2>
                        <span className="text-main text-sm fw-bolder">
                          Price : {productItem.price} EGP
                        </span>
                        <span className="text-main text-sm fw-bolder">
                          QTY : {productItem.count}
                        </span>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <p>
                          Order address :<br />
                          <span>
                            {oldOrders.shippingAddress.details} ,
                            {oldOrders.shippingAddress.city} ,
                            {oldOrders.shippingAddress.phone}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
