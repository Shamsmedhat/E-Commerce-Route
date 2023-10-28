import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../Redux/BrandSlice";
import { Bars } from "react-loader-spinner";

function Brands() {
  let { brands, loading, isError } = useSelector((state) => state.brands);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);
  return (
    <>
      <h2>Brands</h2>
      {loading ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row mx-5">
          {brands.map((brand, i) => (
            <div className="col-md-2" key={i}>
              <div className="cursor-pointer">
                <img src={brand.image} alt={brand.name} />
                <h2 className="h5 text-center">{brand.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Brands;
