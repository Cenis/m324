import React from "react";
import image from "../assets/moneyTransfer.svg";
import "./Money.css";
import Form from "./newForm/Form";

const Money = () => {
  return (
    <div className="money">
      <div className="money__left">
        <div className="money__image">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="money__right">
        <Form /> {/* Ensure Form component is used */}
      </div>
    </div>
  );
};

export default Money;
