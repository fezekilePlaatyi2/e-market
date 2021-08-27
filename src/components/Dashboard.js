import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toast";
import "w3-css/w3.css";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import Store from "../services/Store";
import StoresComponent from "../components/store/Stores";
import SingleStore from "../components/store/SingleStore";
import Market from "../components/store/Market";

const Dashboard = () => {
  let history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [componentDisplay, setComponentDisplay] = useState("all");
  const [storeId, updateOpenedStoreId] = useState("");
  const [cartItems, addOnCart] = useState([]);
  const [cart, setCardData] = useState("");

  const handleAddingStore = () => {
    history.push("/add_store");
  };

  const myComponentDisplayed = () => {
    switch (componentDisplay) {
      case "all":
        return (
          <StoresComponent
            updateOpenedStoreId={updateOpenedStoreId}
            setComponentDisplay={setComponentDisplay}
          />
        );
      case "single":
        return (
          <SingleStore
            storeId={storeId}
            updateOpenedStoreId={updateOpenedStoreId}
            setComponentDisplay={setComponentDisplay}
          />
        );

      case "buy":
        return (
          <Market
            storeId={storeId}
            setComponentDisplay={setComponentDisplay}
            cartItems={cartItems}
            addOnCart={addOnCart}
            updateItems={updateItems}
          />
        );
    }
  };

  const updateCartItemQuantity = (itemId) => {
    var tempState = cartItems;

    var itemIndex = tempState.findIndex((item) => {
      return item.id == itemId;
    });

    if (itemIndex != -1) {
      tempState[itemIndex].quantity = tempState[itemIndex].quantity + 1;
    }

    addOnCart(tempState);

    var updatedCartData = cartItems.map((item, index) => (
      <div key={index} id={item.id}>
        {item.data.item_name} {item.quantity}{" "}
        <button
          onClick={() => updateCartItemQuantity(item.id)}
          className="fa fa-plus"
        >
          plus
        </button>
      </div>
    ));

    setCardData(updatedCartData);
  };

  const updateItems = (item) => {
    var tempState = cartItems;

    var itemIndex = tempState.findIndex((itemOnPreviousState) => {
      return itemOnPreviousState.id == item.id;
    });

    if (itemIndex != -1) {
      console.log(itemIndex);
      tempState[itemIndex].quantity = tempState[itemIndex].quantity + 1;
    } else {
      item.quantity = 1;
      tempState.push(item);
    }

    addOnCart(tempState);

    var updatedCartData = cartItems.map((item, index) => (
      <div key={index} id={item.id}>
        {item.data.item_name} {item.quantity}{" "}
        <button
          onClick={() => updateCartItemQuantity(item.id)}
          className="fa fa-plus"
        >
          plus
        </button>
      </div>
    ));

    setCardData(updatedCartData);
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <ToastContainer />{" "}
      <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      <h1>
        Welcome to <b>eSmall - Joburg</b>
      </h1>
      <div
        style={{
          margin: "2%",
          padding: "2%",
          right: 0,
          top: 0,
          width: "250px",
          height: "250px",
          border: "2px solid grey",
          position: "absolute",
          overflowY: "scroll",
        }}
      >
        <div className="row">
          <div className="col-sm-12">{cart}</div>
        </div>
        <br></br>
        <button className="btn btn-m btn-success">Procceed to payment</button>
      </div>
      <button onClick={() => handleAddingStore()}>Add store</button>
      {myComponentDisplayed()}
    </div>
  );
};

export default Dashboard;
