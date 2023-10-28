import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";

function ForgetPassword() {
  const { forgetPassword } = useContext(UserContext);
  const { VerifyCode, resetPassword } = useContext(UserContext);
  const [msg, setMsg] = useState(null);
  const [email, setEmail] = useState("");

  async function hundleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(await forgetPassword(Object.fromEntries(formData).email));
    const res =
      msg?.data?.statusMsg === "success"
        ? msg?.data?.status === "Success"
          ? await resetPassword(email, Object.fromEntries(formData).newPassword)
          : await VerifyCode(Object.fromEntries(formData).resetcode)
        : await forgetPassword(Object.fromEntries(formData).email);
    setMsg(res);
    console.log(res);
    console.log({
      email: Object.fromEntries(formData).email,
      newPassword: Object.fromEntries(formData).newPassword,
    });
  }

  return (
    <>
      <div onSubmit={hundleSubmit} className="container">
        <h2>Forget password</h2>
        <form className="mt-3">
          {msg?.data?.statusMsg !== "success" &&
          msg?.response?.data?.message !==
            "Reset code is invalid or has expired" &&
          msg?.data?.status !== "Success" ? (
            <div className="forgetPassSection">
              <h4>Sent code to your E-mail</h4>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn bg-main text-white w-25">Send</button>
            </div>
          ) : (
            ""
          )}

          {(msg?.data?.statusMsg === "success" &&
            msg?.data?.message === "Reset code sent to your email") ||
          msg?.response?.data?.message ===
            "Reset code is invalid or has expired" ? (
            <div className="verifyCodeSection">
              <h4>Enter the code</h4>
              <div className="input-group my-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-unlock-keyhole"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Code"
                  aria-label="code"
                  aria-describedby="basic-addon1"
                  id="code"
                  name="resetcode"
                />
              </div>
              <button
                // onClick={() => }
                type="submit"
                className="btn bg-main text-white w-25"
              >
                Verify NOW
              </button>
            </div>
          ) : (
            ""
          )}
          {msg?.data?.status === "Success" && (
            <div className="verifyCodeSection">
              <h4>Enter your new password</h4>
              <div className="input-group my-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  name="email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  placeholder={email}
                  defaultValue={email}
                  disabled
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  aria-label="newPassword"
                  aria-describedby="basic-addon1"
                  id="newPassword"
                  name="newPassword"
                />
              </div>
              <button
                // onClick={() => }
                type="submit"
                className="btn bg-main text-white w-25"
              >
                confirm
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
