import React, { useContext } from "react";
import Categories from "../components/Categories";
import ProductCard from "./ProductCard";

const AllProducts = ({ categories, category, updateCategory }) => {
  return (
    <div className="container">
      <button onClick={() => console.log("Home")}>Home</button>
      <br></br>
      <br></br>
      <div className="row text-center">
        <input
          className="form-control col-sm-7"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div>&nbsp;</div>
        <button className="btn btn-success btn-md">search...</button>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <br></br>
          <Categories updateCategory={updateCategory} categories={categories} />
        </div>{" "}
        <div className="col-sm-9">
          <h2>
            <b>
              {
                categories[
                  categories.findIndex((element) => element.Index === category)
                ].Name
              }
            </b>
          </h2>
          <ProductCard categories={categories} category={category} />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
