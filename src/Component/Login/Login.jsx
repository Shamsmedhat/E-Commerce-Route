import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

function Login() {
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);
  // let { setUserToken, userToken } = useContext(userContext);

  const [isLoding, setLoding] = useState(false);
  const [error, setError] = useState(null);
  let passRegex = /^[A-Z].{5,}$/;

  async function logInOnSubmit(values) {
    setLoding(true);
    let data = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setLoding(false);
        setError(err.response.data.message);
      });

    if (data.data.message === "success") {
      setLoding(false);
      navigate("/");
      localStorage.setItem("userToken", data.data.token);
      setUserToken(data.data.token);
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("email is invaled.")
      .required("email is required."),
    password: Yup.string()
      .matches(
        passRegex,
        'Password must be start with uppercase and by max "6" lenght.'
      )
      .required("Password is required."),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: logInOnSubmit,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="container d-flex justify-content-center">
        <div className="login-form mt-5">
          <h2 className="my-3">Login NOW!</h2>

          {error ? <div className="alert alert-danger">{error}</div> : ""}
          <form onSubmit={formik.handleSubmit} className="mt-3">
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="email"
                name="email"
                value={formik.values.email}
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger py-2 mt-2" role="alert">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-unlock-keyhole"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                aria-label="password"
                aria-describedby="basic-addon1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="password"
                name="password"
                value={formik.values.password}
              />
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger py-2 mt-2" role="alert">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
            <div className="login-bottom d-flex justify-content-between flex-row-reverse align-items-center">
              <div className="subBtn">
                {isLoding ? (
                  <button
                    type="button"
                    className="btn my-3 py-2 px-4 text-white bg-main ms-auto d-block"
                  >
                    <Bars
                      height="25"
                      width="40"
                      color="#fff"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty) ?? false}
                    className="btn my-3 py-2 px-4 text-white bg-main ms-auto d-block"
                    type="submit"
                  >
                    Login
                  </button>
                )}
              </div>

              <div className="forgetPassword">
                <Link className="text-main fw-bolder" to="/forget-password">
                  Forget password ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
