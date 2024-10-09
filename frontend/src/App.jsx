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
        element: <AddProductpage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
