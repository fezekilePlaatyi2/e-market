import React, { useState } from "react";
import StoreService from "../services/Store";

const Store = ({ storeId }) => {
  const store = new StoreService();
  console.log(storeId);

  return (
    <>
      <h1>Name of store</h1>
      <div></div>
    </>
  );
};

export default Store;
