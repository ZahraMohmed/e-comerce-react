import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Shope from "../pages/Shope";
import Cart from "../pages/Cart";
import ProductDeatels from "../pages/ProductDeatels";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import ProtectedRoot from "./ProtectedRoot";
import UseAuth from "../custom-hooks/UseAuth";
import NotFound from "../pages/NotFound";
import Dashboard from "../admin/Dashboard";
import AllProducts from "../admin/AllProducts";
import AddProducts from "../admin/AddProducts";
import Users from "../admin/Users";
function Root() {
  const { currentUser } = UseAuth();
  return (
    <>
      <Routes>
        {currentUser ? (
          <>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="shop" element={<Shope />} />

            <Route path="shop/:id" element={<ProductDeatels />} />
            <Route path="cart" element={<Cart />} />

            <Route
              path="checkout"
              element={
                <ProtectedRoot>
                  <Checkout />
                </ProtectedRoot>
              }
            />

            <Route path="*" element={<NotFound />} />
          
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/all-products" element={<AllProducts />} />
            <Route path="dashboard/add-products" element={<AddProducts />} />
            <Route path="dashboard/users" element={<Users />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="shop" element={<Shope />} />
            <Route
              path="checkout"
              element={
                <ProtectedRoot>
                  <Checkout />
                </ProtectedRoot>
              }
            />

            <Route path="shop/:id" element={<ProductDeatels />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Root;
