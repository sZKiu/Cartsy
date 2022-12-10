import React from "react";
import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import Process from "../components/Home/Process";
import Products from "../components/Home/Products";
import ProductsSlides from "../components/Home/ProductsSlides";
import Slide from "../components/Home/Slide";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          CARTSY
        </title>
      </Helmet>
      <Header />
      <main>
        <Slide />
        <Process />
        <ProductsSlides />
        <Products />
      </main>
      <Footer />
    </>
  );
};

export default Home;
