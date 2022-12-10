import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import {
  BiShoppingBag,
  BiUser,
  BiLogIn,
  BiQuestionMark,
  BiLogOut,
} from "react-icons/bi";
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineLock,
} from "react-icons/ai";
import ModalRecentlyAdded from "./ModalRecentlyAdded";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [oneTime, setOneTime] = useState(true);
  const [lastLastProduct, setlastLastProduct] = useState(0);
  const product = useSelector((state) => state.product);
  const lastProduct = useSelector((state) => state.lastProduct);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const user = window.localStorage.getItem("account");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      lastLastProduct?.amount === undefined ||
      lastProduct?.name !== lastLastProduct?.name
    ) {
      if (lastProduct?.amount > 0) {
        setIsChanged(true);
        setlastLastProduct(lastProduct);
      }
    } else {
      if (lastProduct?.amount > lastLastProduct?.amount) {
        setIsChanged(true);
      }
    }

    if (oneTime && lastProduct.name !== "") {
      setOneTime(false);
      setlastLastProduct(lastProduct);
    }

    if (lastProduct.name === lastLastProduct?.name) {
      setlastLastProduct(lastProduct);
    }
  }, [product, lastProduct]); //eslint-disable-line

  useEffect(() => {
    setIsChanged(false);
  }, []);

  useEffect(() => {
    if (isOpenCart) {
      document.getElementById("modal-cart").style.width = "40vw";
    } else {
      document.getElementById("modal-cart").style.width = "0";
    }
  }, [isOpenCart]);

  return (
    <>
      {isChanged ? (
        <ModalRecentlyAdded
          timeOut={() => {
            setIsChanged(false);
          }}
          cls="translate3rem"
        />
      ) : (
        <ModalRecentlyAdded />
      )}

      {isOpenCart ? <Cart closeCart={setIsOpenCart} /> : null}

      <header>
        <Link to="/" className="container_logo">
          <img src={logo} alt="logo" />
        </Link>

        <form className="container_input" onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/${e.target.search.value}`)
        }} >
          <input type="text" placeholder="Search..." name="search" />
        </form>

        <div className="container_icons">
          <div>
            <BiShoppingBag onClick={() => setIsOpenCart(!isOpenCart)} />
            <div className={`${product.length === 0 ? "" : "productsAmount"}`}>
              <span>{product.length === 0 ? null : product.length}</span>
            </div>
          </div>

          <div>
            <BiUser onClick={() => setUserModal(!userModal)} />

            {userModal ? (
              user ? (
                <div>
                  <div>
                    <BiUser />
                    {JSON.parse(user).username}
                  </div>

                  <div>
                    <div>
                      <AiOutlineSetting />
                      My Account
                    </div>
                    <Link to="/wishlist">
                      <AiOutlineHeart />
                      Wishlist
                    </Link>
                    <div>
                      <AiOutlineLock />
                      My Order
                    </div>
                    <div>
                      <BiQuestionMark />

                      <span>Help</span>
                    </div>
                    <div
                      onClick={() => {
                        window.localStorage.removeItem("account");
                        window.localStorage.removeItem("favorites");
                        setUserModal(!userModal);
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      <BiLogOut />

                      <span>Log Out</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <BiUser />
                    Unknown
                  </div>

                  <div>
                    <div>
                      <BiQuestionMark />

                      <span>Help</span>
                    </div>
                    <Link to="/login">
                      <BiLogIn />

                      <span>Log In</span>
                    </Link>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
