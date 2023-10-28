import React from "react";
import Style from "./Notfound.module.css";
import notFoundImg from "../../Assets/Images/error.svg";

function Notfound() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={notFoundImg}
          alt="not found page"
          style={{ width: "60%", height: "100vh" }}
        />
      </div>
    </>
  );
}

export default Notfound;
