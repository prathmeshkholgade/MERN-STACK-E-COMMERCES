import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout.jsx";
import Body from "./pages/Body.jsx";
import AddProduct from "./components/AddProduct.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";
import Dashboard from "./pages/products/Dashboard.jsx";
import CartPage from "./pages/products/CartPage.jsx";
import AddProductpage from "./pages/products/AddProductpage.jsx";
import EditPage from "./pages/products/EditPage.jsx";
import CheckOutPage from "./pages/products/CheckOutPage.jsx";
import Protected from "./pages/Protected.jsx";
import UserOrderPage from "./pages/products/userOrderPage.jsx";
import OrderDetailsPage from "./pages/products/OrderDetailsPage.jsx";
import AdminOrder from "./pages/products/AdminOrder.jsx";
import AdminOrderDetails from "./components/Admin/AdminOrderDetails.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "add",

        element: (
          <Protected adminOnly={true}>
            {" "}
            <AddProductpage />
          </Protected>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <Protected adminOnly={true}>
            {" "}
            <EditPage />
          </Protected>
        ),
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "orders",
        element: <UserOrderPage />,
      },
      {
        path: "dashboard",
        element: (
          <Protected adminOnly={true}>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "checkout",
        element: (
          <Protected>
            {" "}
            <CheckOutPage />
          </Protected>
        ),
      },
      {
        path: "order/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "admin/order",

        element: (
          <Protected adminOnly={true}>
            {" "}
            <AdminOrder />{" "}
          </Protected>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <Protected adminOnly={true}>
            <AdminOrderDetails />{" "}
          </Protected>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
