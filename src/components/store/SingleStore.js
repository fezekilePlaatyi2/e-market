import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toast";
import "w3-css/w3.css";
import { AuthContext } from "../Auth";
import firebaseConfig from "../../config.js";
import Store from "../../services/Store";

const SingleStore = ({ storeId, setComponentDisplay, updateOpenedStoreId }) => {
  const store = new Store();
  const [categories, setCategories] = useState([]);
  const [itemsList, updateItemsList] = useState([]);
  const [inputList, setInputList] = useState([
    {
      name: "",
      avaliable_stock: 0,
      description: "",
      price: 0,
      category: "",
      pictures: [
        {
          file: "",
          type: "",
          name: "",
        },
      ],
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handlePictureInputChange = (event, index, pictureIndex) => {
    var file = event.target.files[0];
    var tempState = [...inputList];
    tempState[index].pictures[pictureIndex].file = file;
    tempState[index].pictures[pictureIndex].type = file.type;
    tempState[index].pictures[pictureIndex].name =
      new Date().getTime() + "_image." + file.name.split(".").pop();
    setInputList(tempState);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        name: "",
        avaliable_stock: 0,
        description: "",
        price: 0,
        category: "",
        pictures: [
          {
            file: "",
            type: "",
            name: "",
          },
        ],
      },
    ]);
  };

  const handleRemovePictureClick = () => {};

  const handleAddPictureClick = (index) => {
    let updatedList = [...inputList];
    var currentPictureList = updatedList[index].pictures.push({
      file: "",
      type: "",
    });
    updatedList["pictures"] = currentPictureList;
    setInputList(updatedList);
  };

  const handleSubmitAddingStoreItems = (e) => {
    e.preventDefault();

    store
      .saveStoreItems(inputList, storeId)
      .then((result) => {
        console.log(result);
        alert("Done adding");
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding");
      });
  };

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
      <form onSubmit={handleSubmitAddingStoreItems}>
        {inputList.map((x, i) => {
          return (
            <div key={i} className="box">
              <input
                name="name"
                placeholder="Enter Name Of Product"
                value={x.name}
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                className="ml10"
                name="description"
                placeholder="Enter Description Here..."
                value={x.description}
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                className="ml10"
                type="number"
                name="avaliable_stock"
                placeholder="Number of in-stock"
                value={x.avaliable_stock}
                onChange={(e) => handleInputChange(e, i)}
              />

              <input
                className="ml10"
                type="text"
                name="category"
                placeholder="Category"
                value={x.category}
                onChange={(e) => handleInputChange(e, i)}
              />

              <input
                className="ml10"
                type="number"
                name="price"
                placeholder="Enter price per unit"
                value={x.price}
                onChange={(e) => handleInputChange(e, i)}
              />
              {x.pictures.map((picture, pictureIndex) => {
                return (
                  <input
                    key={pictureIndex}
                    className="ml10"
                    type="file"
                    name="picture"
                    onChange={(e) =>
                      handlePictureInputChange(e, i, pictureIndex)
                    }
                  />
                );
              })}
              <i onClick={() => handleAddPictureClick(i)}>Add picture</i>
              {/* <div className="btn-box">
              {inputList.length !== 1 && (
                <button
                  className="mr10"
                  onClick={(e) => handleRemovePictureClick(e, i)}
                >
                  Remove picture
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={() => handleAddPictureClick(i)}>
                  Add picture
                </button>
              )}
            </div> */}
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <i className="mr10" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </i>
                )}
                {inputList.length - 1 === i && (
                  <i onClick={handleAddClick}>Add More Products</i>
                )}
              </div>
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleStore;
