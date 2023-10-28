// import { useContext } from "react";
// import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  // let { userToken } = useContext(UserContext);

  if (localStorage.getItem("userToken") !== null) {
    return <>{props.children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
