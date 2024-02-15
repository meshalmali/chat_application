import React from "react";
import { auth, provider } from "../firebase";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log("I am result:", result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-center bg-cover p-10 lg:p-20 flex justify-center items-center"
      style={{ backgroundImage: `url("/5906153.jpg")` }}
    >
      <div className="w-full h-1/2 lg:h-2/3 max-w-[35rem] bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl flex items-center justify-center p-8">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="text-orange-400 font-black text-3xl lg:text-3xl shadow-custom text-center">
            Welcome to WeeChat!
          </div>
          <button
            className="mt-10 lg:mt-14 cursor-pointer text-base lg:text-2xl font-semibold px-4 lg:px-7 py-3 lg:py-5 transition ease-out transform hover:scale-95 duration-75 flex justify-center items-center rounded-3xl lg:rounded-full shadow-md shadow-gray-500 bg-orange-400 text-white"
            onClick={signIn}
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5 lg:w-8 lg:h-8"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
