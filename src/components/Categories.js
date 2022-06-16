import React, { useContext } from "react";

const Categories = ({ categories, updateCategory }) => {
  const handleUpdateCategory = (index) => {
    updateCategory(index);
  };

  return (
    <ul>
      <h3>Categories</h3>
      {categories.map((category, index) => (
        <li key={index} onClick={() => handleUpdateCategory(category.Index)}>
          {category.Name}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
