import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toast";
import "w3-css/w3.css";
import { AuthContext } from "../Auth";
import firebaseConfig from "../../config.js";
import Store from "../../services/Store";

const Market = ({ storeId, setComponentDisplay, updateItems }) => {
  const store = new Store();
  const [categories, setCategories] = useState([]);
  const [itemsList, updateItemsList] = useState([]);

  useEffect(() => {
    var unsubscribe = store
      .getCategoriesByStoreId(storeId)
      .then((querySnapshot) => {
        let categoriesIds = querySnapshot.docs.map((snapshot) => {
          return snapshot.id;
        });

        setCategories(categoriesIds);
      })
      .catch((error) => {
        console.error(error);
      });

    // return unsubscribe;

    return () => {
      return unsubscribe;
    };
  }, []);

  useEffect(() => {
    categories.forEach((categoryId) => {
      store.getItemsByStoreId(storeId, categoryId, {
        next: (querySnapshot) => {
          //       /*
          //               We should use the below foreach to decide how to update our UI or state
          //           */

          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log("New document added: ", change.doc.data());
              updatedUnfilteredItems(change.doc.id, change.doc.data());
            }
            if (change.type === "modified") {
              console.log("Modified document: ", change.doc.data());
              updatedUnfilteredItems(change.doc.id, change.doc.data());
            }
            if (change.type === "removed") {
              console.log("Removed document: ", change.doc.data());
              updatedUnfilteredItems(change.doc.id, change.doc.data());
            }
          });

          // const updateStoreItemsList = querySnapshot.docs.map((docSnapshot) => {
          //   return {
          //     id: docSnapshot.id,
          //     categoryId: categoryId,
          //     data: docSnapshot.data(),
          //   };
          // });

          // console.log(updateStoreItemsList);

          // // setDepartmentChats((currentList) =>
          // //   currentList.concat(updatedChatList)
          // // );
          // insertStoreItemsToList(updateStoreItemsList);
        },
        error: (error) => console.log(error),
      });
    });
  }, [categories]);

  const updatedUnfilteredItems = (docId, docData) => {
    var newItem = {
      id: docId,
      data: docData,
    };

    updateItemsList((oldItemsList) => [...oldItemsList, newItem]);
  };

  return (
    <div className="App">
      <h3>
        <i onClick={() => setComponentDisplay("all")}>All</i>
      </h3>

      <div>
        <center>
          <h3>
            <b>Items</b>
          </h3>
        </center>
      </div>
      {itemsList.map((item, index) => {
        return (
          <div
            key={index}
            className="w3-col w3-card m4 l3"
            style={{ margin: "2%", background: "#cce6ff", padding: "2%" }}
          >
            <div className="">
              <h1>{item.data.item_name}</h1>

              {item.data.picture_url.map((picture, pictureIndex) => {
                return (
                  <>
                    <br></br>
                    <img
                      key={pictureIndex}
                      src={picture}
                      width="80"
                      alt="Picture not avaliable"
                    />
                    <br></br>
                  </>
                );
              })}
              <h3>Price : R {item.data.price}</h3>
              <h5>Remaining in Stock: {item.data.avaliable_stock}</h5>

              <button onClick={() => updateItems(item)}>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Market;
