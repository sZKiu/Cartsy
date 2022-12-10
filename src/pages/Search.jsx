import React from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { all } from "../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setIncreaseAmount } from "../redux/slices/productSlice";
import { setLastProduct } from "../redux/slices/lastProductSlice";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const Search = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const location = useLocation();
  const productName = location.pathname.split("/")[2];
  let realTitle = [];

  const data = all.filter(
    (el, ind) =>
      el.name.includes(productName.toLocaleLowerCase()) ||
      el.name.includes(productName)
  );

  const addToCart = (el) => {
    const element = products.find((element, ind) => el.name === element.name);
    if (products.some((element, ind) => el.name === element.name)) {
      dispatch(
        setIncreaseAmount({
          name: el.name,
        })
      );

      dispatch(
        setLastProduct({
          name: el.name,
          amount: element?.amount + 1,
        })
      );
    } else {
      dispatch(
        setProduct({
          name: el.name,
          price: el.price,
          cover: el.cover,
          amount: 1,
        })
      );

      dispatch(
        setLastProduct({
          name: el.name,
          amount: 1,
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Header />
      {data.length === 0 ? (
        <main>
            <h1>{`Search: ${productName}`}</h1>
          <div className="wishlist allscreen">

            <span>We dont have that product 😥</span>
          </div>
        </main>
      ) : (
        <main>
          <div className="wishlist">
            <h1>{`Search: ${productName}`}</h1>
            <div>
              {data.map((el, ind) => {
                return (
                  <div key={ind}>
                    <img src={el.cover} alt={el.name} />

                    <h5>
                      {el.name.split("").map((title, i, titleAll) => {
                        if (i - 1 === -1) {
                          realTitle = [];
                          realTitle.push(title.toUpperCase());
                        } else if (titleAll[i - 1] === " ") {
                          realTitle.push(title.toUpperCase());
                        } else {
                          realTitle.push(title);
                        }

                        return realTitle[i];
                      })}
                    </h5>

                    <p>${el.price}</p>

                    <button
                      className="slidebutton-visible"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(el);
                      }}
                    >
                      Buy Now!
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Search;
