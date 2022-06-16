import React, { useContext } from "react";

const Card = ({ product }) => {
  return <div className="product-card-small">{product.ItemName}</div>;
};

export default Card;
