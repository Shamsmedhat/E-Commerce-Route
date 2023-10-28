import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Redux/CategoriesSlice";
import { Bars } from "react-loader-spinner";

function Categories() {
  let { categories, loading } = useSelector((state) => state.categories);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <h2>Categories</h2>

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
        <div className="mx-5">
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-2" key={category._id}>
                <div>
                  <img
                    height={250}
                    className="w-100"
                    src={category.image}
                    alt={category.name}
                  />
                  <h3>{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
