import React, { useState } from "react";
import StoreService from "../services/Store";
import Store from "../components/Store";

const StorePage = ({ storeId }) => {
  console.log(storeId);

  return <Store storeId={storeId} />;
};

export default StorePage;
