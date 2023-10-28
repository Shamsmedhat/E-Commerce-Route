import React from "react";
import Style from "./Footer.module.css";
import amazonLogo from "../../Assets/Images/amazon-removebg-preview.png";
import americanLogo from "../../Assets/Images/amercan-removebg-preview.png";
import masterCardLogo from "../../Assets/Images/MasterCard_Logo.svg.webp";
import paypalLogo from "../../Assets/Images/PayPal-Logo.wine.png";
import iosAppLogo from "../../Assets/Images/download-on-the-app-store-apple-logo.svg";
import androidAppLogo from "../../Assets/Images/google-play-download-android-app-logo.svg";

function Footer() {
  return (
    <>
      <div className={Style.footer}>
        <div className="footerHead">
          <h2>Get the freshCart App</h2>
          <p className="lead">
            We will send you a link , open it on your phone to download the app.
          </p>
          <div className={Style.form_footer}>
            <input
              className="form-control d-inline-block px-2"
              type="email"
              placeholder="Email ..."
              style={{ width: "85%" }}
            />
            <button className="btn bg-main text-white px-4 py-2">
              Share App Link
            </button>
          </div>
        </div>
        <div className="footerBody my-2 d-flex justify-content-between align-items-center">
          <div className="payment">
            <span className="fs-4">Payment Partners </span>
            <img
              src={amazonLogo}
              alt="amazonPay"
              style={{ width: "60px" }}
              className="mx-2"
            />
            <img
              src={americanLogo}
              alt="amazonPay"
              style={{ width: "60px" }}
              className="mx-2"
            />
            <img
              src={masterCardLogo}
              alt="amazonPay"
              style={{ width: "60px" }}
              className="mx-2"
            />
            <img
              src={paypalLogo}
              alt="amazonPay"
              style={{ width: "60px" }}
              className="mx-2"
            />
          </div>
          <div className="app d-flex justify-content-center align-items-center">
            <span className="fs-5 mx-3">Get deliveries with FreshCart</span>
            <img
              src={iosAppLogo}
              alt="iosApp"
              style={{ width: "120px" }}
              className="me-3 cursor-pointer"
            />
            <img
              src={androidAppLogo}
              alt="androidApp"
              style={{ width: "110px" }}
              className="me-3 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
