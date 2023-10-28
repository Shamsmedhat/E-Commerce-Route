import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

function Register() {
  let navigate = useNavigate();
  const [isLoding, setLoding] = useState(false);
  const [error, setError] = useState(null);
  let phoneRegex = /^(011|012|015|010)\d{8}$/;
  let passRegex = /^[A-Z].{5,}$/;

  async function registerationOnSubmit(values) {
    setLoding(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoding(false);
        setError(err.response.data.message);
      });
    console.log(data);

    if (data.message === "success") {
      setLoding(false);
      navigate("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'name must be by min "3" letters.')
      .max(10, 'name must be by max "10" letters.')
      .required("name is required."),
    phone: Yup.string()
      .matches(phoneRegex, "Phone number must be egyption number only.")
      .required("Phone number is required."),
    email: Yup.string()
      .email("email is invaled.")
      .required("email is required."),
    password: Yup.string()
      .matches(
        passRegex,
        'Password must be start with uppercase and by max "6" lenght.'
      )
      .required("Password is required."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword and password not matched")
      .required("rePassword is required."),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerationOnSubmit,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="container">
        <h2 className="my-5">Register NOW!</h2>

        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control my-1 mb-3"
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
          ></input>
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control my-1 mb-3"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
          ></input>
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control my-1 mb-3"
            id="phone"
            name="phone"
            type="tel"
            value={formik.values.phone}
          ></input>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control my-1 mb-3"
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
          ></input>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control my-1 mb-3"
            id="rePassword"
            name="rePassword"
            type="password"
            value={formik.values.rePassword}
          ></input>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2 mt-2" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

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
              />{" "}
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty) ?? false}
              className="btn my-3 py-2 px-4 text-white bg-main ms-auto d-block"
              type="submit"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
