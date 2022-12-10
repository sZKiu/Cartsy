import React, { useState } from "react";
import { product } from "../../assets/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setIncreaseAmount } from "../../redux/slices/productSlice";
import { setLastProduct } from "../../redux/slices/lastProductSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const favorites = JSON.parse(window.localStorage.getItem("favorites"));
  const [, setHello] = useState("");

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

  const favoritesHandler = (item, favorites) => {
    if (favorites) {
      const toSave = [...favorites, item.name];
      if (favorites.length === 0) {
        window.localStorage.setItem("favorites", JSON.stringify(toSave));
        setHello(toSave);
      } else {
        let newFavorites = [];
        let list = [];
        let toDelete;
        favorites.forEach((el) => {
          if (el === item.name) {
            list.push(true);
          } else {
            list.push(false);
            newFavorites.push(el);
          }
        });
        list.forEach((el) => {
          if (el) {
            toDelete = true;
          }
        });
        if (toDelete) {
          window.localStorage.setItem(
            "favorites",
            JSON.stringify(newFavorites)
          );
          setHello(newFavorites);
        } else {
          window.localStorage.setItem("favorites", JSON.stringify(toSave));
          setHello(toSave);
        }
      }
    }
  };

  return (
    <div className="products">
      {product.map((product, ind) => {
        return (
          <div key={ind}>
            <div>
              <img src={product.cover} alt={product.name} />
            </div>

            <div className="product_2">
              <span>
                $
                {product.price.toString().split(".")[1] === 0
                  ? product.price.split(".")[0]
                  : product.price}
              </span>
              <p>{product.name}</p>
            </div>

            <div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const favorite = JSON.parse(
                      window.localStorage.getItem("favorites")
                    );
                    favoritesHandler(product, favorite);
                  }}
                >
                  {favorites?.includes(product.name) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </span>
              <AiOutlinePlusCircle onClick={() => addToCart(product)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
