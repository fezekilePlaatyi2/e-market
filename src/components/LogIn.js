import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <br></br>
        <input type="email" name="email" placeholder="Email" />
        <br></br>
        <label for="password">Password</label>
        <br></br>
        <input type="password" name="password" placeholder="Password" />
        <br></br>
        <button type="submit">Submit</button>
        <br></br>
      </form>
      <br></br>
      <br></br>
      <a href="/signup">Register</a>
    </>
  );
};

export default LogIn;
