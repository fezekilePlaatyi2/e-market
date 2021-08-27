import app from "../config";

class Store {
  constructor() {
    this.storeRef = app.firestore().collection("stores");
    this.storageRef = app.storage().ref();
  }

  addStore = (name) => {
    var user = app.auth().currentUser;
    if (!user) {
      return Promise.reject("Error getting current user details.");
    }

    return this.storeRef.add({
      store_owner_id: user.uid,
      store_name: name,
      approval_status: false,
      date_created: new Date(),
    });
  };

  listStoresForUser = () => {
    var user = app.auth().currentUser;
    if (!user) {
      return Promise.reject("Error getting current user details.");
    }

    return this.storeRef.where("store_owner_id", "==", user.uid).get();
  };

  listStores = () => {
    return this.storeRef.get();
  };

  saveStoreItems = (items, storeId) => {
    var saveItemPromises = [];

    items.forEach((item) => {
      this.saveItemPictures(item)
        .then((urls) => {
          this.saveItemToDB(urls, item, storeId)
            .then((result) => {
              return Promise.resolve(result);
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    });

    return Promise.all(saveItemPromises)
      .then((results) => {
        return Promise.resolve(results);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  saveItemPictures = (item) => {
    let saveItemPicturesPromises = [];

    item.pictures.forEach((itemPictures) => {
      const metadata = {
        contentType: itemPictures.type,
      };
      const task = this.storageRef
        .child(itemPictures.name)
        .put(itemPictures.file, metadata);

      saveItemPicturesPromises.push(
        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((itemPictureUrl) => {
            return Promise.resolve(itemPictureUrl);
          })
          .catch((error) => Promise.reject(error))
      );
    });

    return Promise.all(saveItemPicturesPromises)
      .then((results) => {
        return Promise.resolve(results);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  saveItemToDB = (itemPicturesUrls, item, storeId) => {
    var user = app.auth().currentUser;
    if (!user) {
      return Promise.reject("Error getting current user details.");
    }

    return new Promise((resolve, reject) => {
      return this.storeRef
        .doc(storeId)
        .collection("categories")
        .doc(item.category)
        .collection("items")
        .add({
          user_added_item: user.uid,
          item_name: item.name,
          avaliable_stock: item.avaliable_stock,
          description: item.description,
          pictures: itemPicturesUrls,
          price: item.price,
          date_added: new Date(),
        })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  };

  getItemsByStoreId = (storeId, categoryId, observer) => {
    return this.storeRef
      .doc(storeId)
      .collection("categories")
      .doc(categoryId)
      .collection("items")
      .onSnapshot(observer);
  };

  getCategoriesByStoreId = (storeId) => {
    return this.storeRef.doc(storeId).collection("categories").get();
  };

  getStoreItemsById = (storeId) => {
    return this.getCategoriesByStoreId(storeId)
      .then((categoriesQuerySnapshot) => {
        // var categorires = .docs();
        console.log(categoriesQuerySnapshot);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
}

export default Store;
