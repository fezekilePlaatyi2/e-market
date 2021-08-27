import React, { useState } from "react";
import Store from "../services/Store";

const AddStore = () => {
  const store = new Store();
  const [currentUser, setCurrentUser] = useState(null);
  const [storeName, setStoreName] = useState("");

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const handleAddStore = () => {
    if (storeName) {
      store
        .addStore(storeName)
        .then((result) => {
          alert("Successfuly added Store");
        })
        .catch((error) => {
          alert("An error occured.");
          console.log(error);
        });
    }
  };
  return (
    <>
      <h1>Adding Store. Put details above</h1>
      <div>
        <label for="email">Name of store</label>
        <br></br>
        <input
          type="text"
          name="nameOfStore"
          onChange={handleStoreNameChange}
          placeholder="Enter name of the store here..."
        />
        <br></br>
        <button onClick={() => handleAddStore()}>Add</button>
      </div>
    </>
  );
};

export default AddStore;
