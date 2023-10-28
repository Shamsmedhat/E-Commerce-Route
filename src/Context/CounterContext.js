import { createContext, useCallback, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export let ConterContext = createContext();

function ConterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  function countNum() {
    setCounter((counter) => counter + 1);
  }

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(UserContext);

  const getWishlist = useCallback(async () => {
    try {
      setLoading(false);
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: userToken,
          },
        }
      );
      setWishlist(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  async function addToWishList(productId) {
    try {
      setLoading(false);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: userToken,
          },
        }
      );
      setWishlist(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishList(productId) {
    try {
      setLoading(true);
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: userToken,
          },
        }
      );
      console.log(res);
      setLoading(false);
      setWishlist(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ConterContext.Provider
      value={{
        countNum,
        getWishlist,
        addToWishList,
        removeFromWishList,
        counter,
        wishlist,
        loading,
      }}
    >
      {props.children}
    </ConterContext.Provider>
  );
}

export default ConterContextProvider;
