import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import AllProducts from "../components/AllProducts";
import Product from "../components/Product";
import Cart from "../components/Cart";
import * as qs from "query-string";

const categories = [
  {
    Index: "diary",
    Name: "Diary Products",
    Items: [
      {
        ItemName: "Yogurt 1",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
      {
        ItemName: "Yogurt 2",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
    ],
  },
  {
    Index: "drinks",
    Name: "Drinks",
    Items: [
      {
        ItemName: "Enegry Drink 1",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
      {
        ItemName: "Enegry Drink  2",
        ItemPrice: 11.0,
        InStockQuantity: 30,
      },
    ],
  },
];

const Home = (props) => {
  const parsed = qs.parse(window.location.search);
  const [component, setComponentDisplay] = useState("");
  const [category, updateCategory] = useState("");
  const [productOnView, setProductOnView] = useState("");

  const updateComponent = (componentName) => {
    console.log(componentName);
    setComponentDisplay(componentName);
  };

  useEffect(() => {
    updateCategory(categories[0].Index);
  }, [categories]);

  useEffect(() => {
    if ("product_id" in parsed) {
      setProductOnView(parsed.product_id);
      updateComponent("single");
    }
  }, []);

  const componentDisplay = () => {
    switch (component) {
      case "all": {
        return (
          <AllProducts
            updateCategory={updateCategory}
            category={category}
            categories={categories}
          />
        );
      }
      case "single": {
        return <Product product={productOnView} />;
      }

      case "cart": {
        return <Cart />;
      }

      case "orders": {
        return <>My Orders</>;
      }

      default: {
        return (
          <>
            Home <button onClick={() => updateComponent("all")}>Shop</button>
          </>
        );
      }
    }
  };

  return (
    <>
      <Navigation setComponentDisplay={setComponentDisplay} />
      {componentDisplay()}
    </>
  );
};

export default Home;
