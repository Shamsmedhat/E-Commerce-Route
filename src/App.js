import "./App.css";
import Register from "./Component/Register/Register";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Brands from "./Component/Brands/Brands";
import Cart from "./Component/Cart/Cart";
import Categories from "./Component/Categories/Categories";
import Login from "./Component/Login/Login";
import Products from "./Component/Products/Products";
import Notfound from "./Component/Notfound/Notfound";
import Orders from "./Component/Orders/Orders";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import Productdetails from "./Component/Productdetails/Productdetails";
import { createHashRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import CartContextProvider from "./Context/CartContext";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Address from "./Component/Address/Address";
import Wishlist from "./Component/Wishlist/Wishlist";
import ConterContextProvider from "./Context/CounterContext";

const queryClient = new QueryClient();

let routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wish-list",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productdetails/:id",
        element: (
          <ProtectedRoute>
            <Productdetails />
          </ProtectedRoute>
        ),
      },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <ConterContextProvider>
              <Provider store={store}>
                <RouterProvider router={routers}></RouterProvider>
              </Provider>
            </ConterContextProvider>

            {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-left" /> */}
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
