import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { Offline } from "react-detect-offline";
import { BsWifiOff } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import Style from "./Layout.module.css";

function Layout() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  });
  return (
    <>
      <Toaster />
      <Offline>
        <div className="network">
          <div className="wifi">
            <BsWifiOff />
          </div>
          Please check your internet , Your are offline NOW!
        </div>
      </Offline>
      <Navbar />
      <div className={Style.Layout}>
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
