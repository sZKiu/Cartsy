import React from "react";
import { slide } from "../../assets/data";

const Slide = () => {
  return <div className="slide">{
    slide.map((slides, ind) => (
      <div key={ind} >
        <img src={slides.image} alt="" />
      </div>
    ))
  }</div>;
};

export default Slide;
