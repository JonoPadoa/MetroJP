import React from "react";
import style from "./Card.module.css";

function Card({ data }) {
  return (
    <div className={style.uno_main}>
      <img
        src="./images/Property1.jpg"
        alt="property"
        width="300"
        height="200"
      />
      <div>
        <h2>{data.Address}</h2>
        <p>Suburb: {data.Suburb}</p>
        <p>Bedrooms: {data.Bedrooms}</p>
        <p>Price per week: {data.Price}</p>
      </div>
    </div>
  );
}

export default Card;
