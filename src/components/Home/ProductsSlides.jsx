// import React, { useState, useEffect } from "react";
// import { category } from "../../assets/data";
// import { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { setProduct, setIncreaseAmount } from "../../redux/slices/productSlice";
// import { setLastProduct } from "../../redux/slices/lastProductSlice";

// const ProductsSlides = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product);
//   const [showSlideButton, setShowSlideButton] = useState({
//     status: false,
//     name: "",
//   });
//   let realTitle = [];

//   const addToCart = (el) => {
//     const element = products.find((element, ind) => el.title === element.name);
//     if (products.some((element, ind) => el.title === element.name)) {
//       dispatch(
//         setIncreaseAmount({
//           name: el.title,
//         })
//       );

//       dispatch(
//         setLastProduct({
//           name: el.title,
//           amount: element?.amount + 1,
//         })
//       );
//     } else {
//       dispatch(
//         setProduct({
//           name: el.title,
//           price: el.price,
//           cover: el.cover,
//           amount: 1,
//         })
//       );

//       dispatch(
//         setLastProduct({
//           name: el.title,
//           amount: 1,
//         })
//       );
//     }
//   };

//   return (
//     <Swiper
//       className="productsSlides"
//       modules={[Navigation]}
//       navigation={true}
//       slidesPerView={6}
//       spaceBetween={10}
//       loop={true}
//     >
//       {category.map((item, ind, all) => {
//         return (
//           <SwiperSlide
//             key={ind}
//             onClick={() => {
//               document.querySelector(
//                 `.swiperslide-button-${item.title
//                   .replaceAll(" ", "-")
//                   .replaceAll("&", "-")}`
//               ) !== null
//                 ? setShowSlideButton({
//                     status: false,
//                   })
//                 : setShowSlideButton({
//                     status: true,
//                     name: item.title,
//                   });
//             }}
//           >
//             <img src={item.cover} alt={item.title} />

//             <h5>
//               {item.title.split("").map((title, i, titleAll) => {
//                 if (i - 1 === -1) {
//                   realTitle = [];
//                   realTitle.push(title.toUpperCase());
//                 } else if (titleAll[i - 1] === " ") {
//                   realTitle.push(title.toUpperCase());
//                 } else {
//                   realTitle.push(title);
//                 }

//                 return realTitle[i];
//               })}
//             </h5>

//             {showSlideButton.status && showSlideButton.name === item.title ? (
//               <button
//                 className={`swiperslide-button-${item.title
//                   .replaceAll(" ", "-")
//                   .replaceAll("&", "-")}`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   addToCart(item);
//                 }}
//               >
//                 Buy Now!
//               </button>
//             ) : null}
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };

// export default ProductsSlides;

import React, { useState } from "react";
import { category } from "../../assets/data";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setIncreaseAmount } from "../../redux/slices/productSlice";
import { setLastProduct } from "../../redux/slices/lastProductSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductsSlides = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [showSlideButton, setShowSlideButton] = useState({
    status: false,
    name: "",
  });
  const favorites = JSON.parse(window.localStorage.getItem("favorites"));
  const [, setHello] = useState("");

  let realTitle = [];

  const addToCart = (el) => {
    const element = products.find((element, ind) => el.title === element.name);
    if (products.some((element, ind) => el.title === element.name)) {
      dispatch(
        setIncreaseAmount({
          name: el.title,
        })
      );

      dispatch(
        setLastProduct({
          name: el.title,
          amount: element?.amount + 1,
        })
      );
    } else {
      dispatch(
        setProduct({
          name: el.title,
          price: el.price,
          cover: el.cover,
          amount: 1,
        })
      );

      dispatch(
        setLastProduct({
          name: el.title,
          amount: 1,
        })
      );
    }
  };

  const favoritesHandler = (item, favorites) => {
    if (favorites) {
      const toSave = [...favorites, item.title];
      if (favorites.length === 0) {
        window.localStorage.setItem("favorites", JSON.stringify(toSave));
        setHello(toSave);
      } else {
        let newFavorites = [];
        let list = [];
        let toDelete;
        favorites.forEach((el) => {
          if (el === item.title) {
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
    <Swiper
      className="productsSlides"
      modules={[Navigation]}
      navigation={true}
      slidesPerView={6}
      spaceBetween={10}
      loop={true}
    >
      {category.map((item, ind, all) => {
        return (
          <SwiperSlide
            key={ind}
            onClick={() => {
              if (item.title === showSlideButton.name) {
                setShowSlideButton({
                  status: false,
                });
              } else {
                setShowSlideButton({
                  status: true,
                  name: item.title,
                });
              }
            }}
          >
            <img src={item.cover} alt={item.title} />

            <h5>
              {item.title.split("").map((title, i, titleAll) => {
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

            <button
              className={` ${
                item.title === showSlideButton.name
                  ? "slidebutton-visible"
                  : "slidebutton-nonvisible"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
            >
              Buy Now!
            </button>

            {item.title === showSlideButton.name &&
            favorites?.length !== undefined ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  const favorite = JSON.parse(
                    window.localStorage.getItem("favorites")
                  );
                  favoritesHandler(item, favorite);
                }}
              >
                {favorites.includes(item.title) ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </span>
            ) : null}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ProductsSlides;
