import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Root from "../../routers/Root";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";

function Layoutt() {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <div>
        <Root />
      </div>
      <Footer />
    </>
  );
}

export default Layoutt;
