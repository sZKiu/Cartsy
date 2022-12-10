import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./ModalRecentlyAdded.css"
import { GoVerified } from "react-icons/go";
import { useSelector } from "react-redux";


function ModalRecentlyAdded({ timeOut, cls }) {
  const product = useSelector((state) => state.product);
  const lastProduct = useSelector((state) => state.lastProduct);
  const [title, setTitle] = useState({});

  useEffect(() => {
    const oneProduct = product.find((el, ind) => el.name === lastProduct.name);

    setTitle({
      name: oneProduct?.name,
      amount: oneProduct?.amount,
    });

    setTimeout(() => timeOut !== undefined ? timeOut() : null, 1000);
  }, [timeOut, product, lastProduct.name]);

  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={
            title?.name !== undefined
              ? `modal-recentlyAdded ${cls !== undefined ? cls : ""}`
              : "modal-recentlyAdded no-background"
          }
        >
          {title?.name !== undefined ? <GoVerified /> : ""}

          {title?.name !== undefined
            ? `${title?.amount} ${title?.name?.replaceAll("-", " ")} added`
            : ""}
        </div>,
        document.getElementById("modal-recentlyAdded")
      )}
    </>
  );
}

export default React.memo(ModalRecentlyAdded);