import axios from "axios";
import { createContext, useCallback, useState } from "react";

export let cartContext = createContext();

function CartContextProvider(props) {
  const [cartOwner, setCartOwner] = useState(null);
  const userToken = localStorage.getItem("userToken");
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const addToCart = useCallback(
    async (productId) => {
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { productId },
          {
            headers: {
              token: userToken,
            },
          }
        );
        localStorage.setItem("cartOwnerId", res?.data?.data.cartOwner);
        let id = localStorage.getItem("cartOwnerId");
        setCartOwner(id);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    [userToken]
  );

  const getUserCart = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: userToken,
          },
        }
      );
      setCartOwner(res?.data?.data?.cartOwner);
      console.log(cartOwner);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }, [userToken, cartOwner]);

  function removeFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function onlinePayment(cartId, url, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: values,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  const getUserOrders = useCallback(
    async (userId) => {
      try {
        let res = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          {
            headers: {
              token: userToken,
            },
          }
        );
        return res;
      } catch (error) {}
    },
    [userToken]
  );

  // async function cashPayment(cartId, values) {
  //   try {
  //     const res = await axios.post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  //       { headers },
  //       {
  //         shippingAddress: values,
  //       }
  //     );
  //     console.log("cash payment", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <>
      <cartContext.Provider
        value={{
          addToCart,
          onlinePayment,
          getUserCart,
          removeFromCart,
          updateCount,
          getUserOrders,
          cartOwner,
        }}
      >
        {props.children}
      </cartContext.Provider>
    </>
  );
}
export default CartContextProvider;
