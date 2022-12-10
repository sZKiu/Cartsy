import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  setIncreaseAmount,
  setDeleteProduct,
  setDecreaseAmount,
  setCleanAll,
} from "../../redux/slices/productSlice";

const Cart = ({ closeCart }) => {
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [realPrice, setRealPrice] = useState(0);
  let realTitle = [];

  useEffect(() => {
    let price = [];
    let realPrice = 0;

    products.forEach((el, ind) => {
      price.push(el.price * el.amount);
    });

    price.forEach((el, ind) => {
      realPrice += el;
    });

    setRealPrice(realPrice);
  }, [products]);

  return (
    <>
      {ReactDOM.createPortal(
        <div>
          {products.length !== 0 ? (
            <>
              <div>
                <span>Shopping cart</span>

                <AiOutlineClose onClick={() => closeCart(false)} />
              </div>

              <div>
                {products.map((el, ind) => {
                  return (
                    <div key={ind}>
                      <div>
                        <img src={el.img} alt={el.name} />
                      </div>

                      <div>
                        <div>
                          <h4>
                            {el.name.split("").map((name, i, nameAll) => {
                              if (i - 1 === -1) {
                                realTitle = [];
                                realTitle.push(name.toUpperCase());
                              } else if (nameAll[i - 1] === " ") {
                                realTitle.push(name.toUpperCase());
                              } else {
                                realTitle.push(name);
                              }

                              return realTitle[i];
                            })}
                          </h4>
                          <span>{`Unit Price $${el.price}`}</span>
                          <div>
                            <div>
                              <AiOutlinePlus
                                onClick={() =>
                                  dispatch(
                                    setIncreaseAmount({
                                      name: el.name,
                                    })
                                  )
                                }
                              />
                            </div>
                            <div>
                              <span>
                                {el.amount >= 1
                                  ? el.amount
                                  : dispatch(
                                      setDeleteProduct({
                                        name: el.name,
                                      })
                                    )}
                              </span>
                            </div>
                            <div>
                              <AiOutlineMinus
                                onClick={() =>
                                  dispatch(
                                    setDecreaseAmount({
                                      name: el.name,
                                    })
                                  )
                                }
                              />
                            </div>

                            <BsFillTrashFill
                              onClick={() =>
                                dispatch(setDeleteProduct(el.name))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div onClick={() => dispatch(setCleanAll())}>
                <p>Priceed To Checkout</p>

                <span>${realPrice.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span>Shopping cart</span>

                <AiOutlineClose onClick={() => closeCart(false)} />
              </div>
              <span>The cart is empty 😅</span>
            </>
          )}
        </div>,
        document.getElementById("modal-cart")
      )}
    </>
  );
};

export default Cart;
