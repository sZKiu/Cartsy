import React from "react";
import { order } from "../../assets/data";

const Process = () => {
  return (
    <div className="process">
      {order.map((order, ind) => (
        <div key={ind}>
          <div>
            <span>{order.id}</span>
          </div>

          <div>
            <h4>{order.title}</h4>
            <p>{order.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Process;
