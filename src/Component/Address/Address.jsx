import { useFormik } from "formik";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

function Address() {
  let { onlinePayment, getUserCart ,cashPayment} = useContext(cartContext);
  const MAIN_URL = window.location.origin;
  async function getCartId() {
    let resCartId = await getUserCart();

    return resCartId.data.data._id;
  }

  async function handleAddressSubmit(values) {
    let cartId = await getCartId();
    let response = await onlinePayment(cartId, MAIN_URL, values);
    window.location.href = response.data?.session?.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleAddressSubmit,
  });
  return (
    <>
      <h2>Address</h2>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details"> Address details : </label>
          <input
            className="form-control mb-2"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="details"
            id="details"
          />
          <label htmlFor="phone"> Phone : </label>
          <input
            className="form-control mb-2"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
          />
          <label htmlFor="city"> City : </label>
          <input
            className="form-control mb-2"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="city"
            id="city"
          />
          <button
            onClick={getCartId}
            type="submit"
            className="btn my-3 bg-main text-white w-25"
          >
            Check out now
          </button>
        </form>
      </div>
    </>
  );
}

export default Address;
