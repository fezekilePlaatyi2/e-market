import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1>Sign Up</h1>
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
      <a href="/login">Login</a>
    </>
  );
};

export default SignUp;
