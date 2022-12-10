import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { all } from "../../src/assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setIncreaseAmount } from "../redux/slices/productSlice";
import { setLastProduct } from "../redux/slices/lastProductSlice";
import { Helmet } from "react-helmet";

const Wishlist = () => {
  const wishlist = JSON.parse(window.localStorage.getItem("favorites"));
  const [data, setData] = useState([]);
  let realTitle = [];
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  useEffect(() => {
    const oldData = [];
    wishlist.forEach((wish, i) => {
      all.forEach((elAll, allInd) => {
        if (elAll.name === wish) {
          oldData.push({
            name: elAll.name,
            img: elAll.cover,
            price: elAll.price,
          });
        }
      });
    });

    setData(oldData);
  }, []); // eslint-disable-line

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
          cover: el.img,
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
        <title>Wishlist</title>
      </Helmet>
      <Header />
      {wishlist.length === 0 ? (
        <main>
          <h1>Wishlist</h1>
          <div className="wishlist allscreen">
            <span>You dont have any wish</span>
          </div>
        </main>
      ) : (
        <main>
          <div className="wishlist">
            <h1>Wishlist</h1>
            <div>
              {data.map((el, ind) => {
                return (
                  <div key={ind}>
                    <img src={el.img} alt={el.name} />

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

export default Wishlist;
