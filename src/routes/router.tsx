import { createBrowserRouter } from "react-router-dom";

//Layout and pages
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Layout from "../layouts/Layout";
import ShoppingCart from "../components/ShoppingCart"
import { ROUTE_CONFIG } from "../constant/routes";

//Define the routes
const router = createBrowserRouter([
  {
    path: ROUTE_CONFIG.Routes.Home.path,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTE_CONFIG.Routes.Cart.path,
        element: <ShoppingCart />,
      },
      {
        path: ROUTE_CONFIG.Routes.Cart.path,
        element: <Cart />,
      },
    ],
  },
]);

export default router;
