import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import { auth, provider } from "../firebase";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("I am result:", result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://www.logolynx.com/images/logolynx/ae/ae304afa5e2c51c209637003eabf0deb.jpeg"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to WeeChat</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
