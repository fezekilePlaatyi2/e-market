import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toast";
import "w3-css/w3.css";
import { AuthContext } from "../Auth";
import Store from "../../services/Store";
var sha512 = require("sha512");

const Stores = ({ setComponentDisplay, updateOpenedStoreId }) => {
  const store = new Store();
  const [myStores, putMyStoreList] = useState([]);
  const [stores, putStoreList] = useState([]);
  const [ipayFullName, setIpayFullName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [ipayHash, setIpayHash] = useState("");
  const [ipayTransactionRef, setIpayTransactionRef] = useState("");

  const [ipayBankRef, setIpayBankRef] = useState("");

  const [SiteCode, setSiteCode] = useState("");
  const [CountryCode, setCountryCode] = useState("");
  const [CurrencyCode, setCurrencyCode] = useState("");
  const [Amount, setAmount] = useState("");
  const [TransactionReference, setTransactionReference] = useState("");
  const [BankReference, setBankReference] = useState("");
  const [Optional1, setOptional1] = useState("");
  const [Optional2, setOptional2] = useState("");
  const [Optional5, setOptional5] = useState("");
  const [Customer, setCustomer] = useState("");
  const [CancelUrl, setCancelUrl] = useState("");
  const [ErrorUrl, setErrorUrl] = useState("");
  const [SuccessUrl, setSuccessUrl] = useState("");
  const [IsTest, setIsTest] = useState("");

  useEffect(() => {
    var unsubscribe = store
      .listStoresForUser()
      .then((storesList) => {
        putMyStoreList(storesList.docs);
      })
      .catch((error) => {
        toast(error.message);
        return;
      });

    return () => {
      return unsubscribe;
    };
  }, []);

  useEffect(() => {
    var unsubscribe = store
      .listStores()
      .then((storesList) => {
        putStoreList(storesList.docs);
      })
      .catch((error) => {
        toast(error.message);
        return;
      });

    return () => {
      return unsubscribe;
    };
  }, []);

  const goToStoreHandler = (storeId) => {
    updateOpenedStoreId(storeId);
    setComponentDisplay("single");
  };

  const goToStore = (storeId) => {
    updateOpenedStoreId(storeId);
    setComponentDisplay("buy");
  };

  const iPayClickedEventHandler = () => {
    document.getElementById("ipayModal").style.display = "inline";
  };

  const handlePaySubmit = (event) => {
    event.preventDefault();

    var hashString =
      document.getElementById("SiteCode").value +
      document.getElementById("CountryCode").value +
      document.getElementById("CurrencyCode").value +
      document.getElementById("ipayAmount").value +
      document.getElementById("TransactionReference").value +
      document.getElementById("BankReference").value +
      document.getElementById("Optional1").value +
      document.getElementById("Optional2").value +
      document.getElementById("Optional5").value +
      document.getElementById("Customer").value +
      document.getElementById("CancelUrl").value +
      document.getElementById("ErrorUrl").value +
      document.getElementById("SuccessUrl").value +
      document.getElementById("IsTest").value +
      "8xExgXUcwRGaF0LELSoioK3v2nquP4us";

    var hash = sha512(hashString.toLowerCase(), "utf-8");
    document.getElementById("ipayHash").value = hash.toString("hex");
    console.log(hash.toString("hex"));
    event.target.submit();
  };

  return (
    <div>
      <div className="w3-row">
        {myStores.map((store, index) => (
          <div key={index} className="w3-col m4 l3">
            <div
              className="w3-card-2"
              style={{ margin: "2%", background: "#cce6ff", padding: "2%" }}
            >
              <div className="w3-row">
                <b>{store.data().store_name}</b>
              </div>
              <div className="w3-row">
                Status:{" "}
                {store.data().approval_status
                  ? "Approved"
                  : "Not approve. Contact Support for Approval."}
              </div>
              <div className="w3-row">
                <button onClick={() => goToStoreHandler(store.id)}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => iPayClickedEventHandler()}
          id="ipayButton"
          data-amount="0.01"
          type="button"
          style={{
            width: "400px",
            padding: "10px 16px",
            fontSize: "20px",
            lineHeight: "1.33",
            borderRadius: "6px",
            color: "rgb(68, 175, 133)",
            backgroundColor: "rgb(255, 255, 255)",
            borderColor: "rgb(68, 175, 133)",
            display: "inline-block",
            marginBottom: "20px",
            fontWeight: "800",
            textAlign: "center",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
            cursor: "pointer",
            userSelect: "none",
            boxShadow: "rgb(136, 136, 136) 3px 3px 20px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#EEE")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FFFFFF")}
        >
          <div
            style={{ float: "left", paddingTop: "15px", paddingLeft: "15px" }}
          >
            Click Here
            <br />
            to pay with
          </div>
          <img src="https://cdn.i-station.co.za/img/ozow-payment-logo-c.png" />
        </button>

        <div
          id="ipayModal"
          className="modal"
          style={{
            display: "none",
            position: "fixed",
            zIndex: "1",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fefefe",
              margin: "15% auto",
              padding: "20px",
              border: "1px solid #888",
              width: "80%",
              borderRadius: "9px",
            }}
          >
            <span
              onClick={() =>
                (document.getElementById("ipayModal").style.display = "none")
              }
              className="ipayClose"
              style={{
                color: "#aaa",
                float: "right",
                fontSize: "28px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              &times;
            </span>

            <form
              method="post"
              onSubmit={(e) => handlePaySubmit(e)}
              action="https://pay.ozow.com/"
              id="ipayForm"
            >
              <p className="ipay-name">
                <input
                  type="text"
                  id="Optional1"
                  name="Optional1"
                  placeholder="Full Name"
                  className="fields"
                  required
                />
              </p>
              <p className="ipay-email">
                <input
                  type="email"
                  id="Customer"
                  name="Customer"
                  placeholder="Email"
                  className="fields"
                  required
                />
              </p>
              <p className="ipay-contact">
                <input
                  type="text"
                  id="Optional2"
                  name="Optional2"
                  placeholder="Contact Number"
                  className="fields"
                  required
                />
              </p>
              <p className="ipay-amount"></p>
              <button
                id="ipayButton"
                type="submit"
                style={{
                  padding: "10px 16px",
                  fontSize: "20px",
                  lineHeight: "1.33",
                  borderRadius: "6px",
                  color: "rgb(92, 184, 92)",
                  backgroundColor: "rgb(255, 255, 255)",
                  borderColor: "rgb(76, 174, 76)",
                  display: "inline-block",
                  marginBottom: "20px",
                  fontWeight: 800,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  verticalAlign: "middle",
                  cursor: "pointer",
                  userSelect: "none",
                  boxShadow: "rgb(136, 136, 136) 3px 3px 5px",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#EEE")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#FFFFFF")}
              >
                <div
                  style={{
                    float: "left",
                    paddingTop: "15px",
                    paddingLeft: "15px",
                  }}
                >
                  Click Here
                  <br />
                  To Pay Now
                </div>
                <img
                  src="https://cdn.i-station.co.za/img/ozow-payment-logo-c.png"
                  style={{ margin: "5px 0 -5px 20px" }}
                />
              </button>
              <input
                type="hidden"
                id="ipayAmount"
                name="Amount"
                placeholder="Amount"
                value="0.01"
                className="fields"
                required
              />

              <input
                type="hidden"
                id="SiteCode"
                name="SiteCode"
                value="MYP-MYP-002"
              />
              <input
                type="hidden"
                id="CountryCode"
                name="CountryCode"
                value="ZA"
              />
              <input
                type="hidden"
                id="CurrencyCode"
                name="CurrencyCode"
                value="ZAR"
              />
              <input
                type="hidden"
                id="TransactionReference"
                name="TransactionReference"
                value="mY Market Purchase 1"
              />
              <input
                type="hidden"
                id="BankReference"
                name="BankReference"
                value="mY Market Purchase 1"
              />
              <input
                type="hidden"
                id="Optional5"
                name="Optional5"
                value="Buy Now"
              />
              <input
                type="hidden"
                id="CancelUrl"
                name="CancelUrl"
                value="https://ozow.com/demo-cancelled/"
              />
              <input
                type="hidden"
                id="ErrorUrl"
                name="ErrorUrl"
                value="https://ozow.com/demo-cancelled/"
              />
              <input
                type="hidden"
                id="SuccessUrl"
                name="SuccessUrl"
                value="https://ozow.com/demo-success/"
              />
              <input type="hidden" id="IsTest" name="IsTest" value="false" />
              <input type="hidden" id="ipayHash" name="HashCheck" />
            </form>
          </div>
        </div>
      </div>

      <div className="w3-row">
        {stores.map((store, index) => (
          <div key={index} className="w3-col m4 l3">
            <div
              className="w3-card-2"
              style={{ margin: "2%", background: "#cce6ff", padding: "2%" }}
            >
              <div className="w3-row">
                <b>{store.data().store_name}</b>
              </div>
              <div className="w3-row">
                Status:{" "}
                {store.data().approval_status ? "Approved" : "Not approved."}
              </div>
              <div className="w3-row">
                <button onClick={() => goToStore(store.id)}>Visit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
