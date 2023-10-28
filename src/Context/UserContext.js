import axios from "axios";
import { createContext, useState } from "react";

export let UserContext = createContext();

function UserContextProvider(Props) {
  const [userToken, setUserToken] = useState(null);

  async function forgetPassword(email) {
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async function VerifyCode(resetCode) {
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function resetPassword(email, newPassword) {
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // async function getUserOrders(userId) {
  //   return axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  //     .then((res) => res)
  //     .catch((err) => err);
  // }

  return (
    <>
      <UserContext.Provider
        value={{
          setUserToken,
          forgetPassword,
          VerifyCode,
          resetPassword,
          userToken,
        }}
      >
        {Props.children}
      </UserContext.Provider>
    </>
  );
}
export default UserContextProvider;
