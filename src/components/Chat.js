import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../context/StateProvider";
import firebase from "firebase/compat/app";
import moment from "moment";
import Sidebar from "./Sidebar";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      setSeed(Math.floor(Math.random() * 100));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("You typed", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const getDate = (date) => {
    if (moment(date).format("DD MMM 'YY, h:mm A") !== "Invalid date") {
      return moment(date).format("DD MMM 'YY, h:mm A");
    }
  };

  return (
    <div className="h-full w-full flex">
      <div className="hidden lg:flex h-full w-1/3">
        <Sidebar showChat={false} />
      </div>
      <div className="h-full w-full lg:w-2/3 relative">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg flex absolute top-0 z-20 left-0 w-full p-[1.125rem] items-center shadow-2xl">
          <Avatar
            src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&backgroundType=gradientLinear`}
          />
          <div className="text-black p-3 shadow-custom font-semibold text-lg">
            {roomName}
          </div>
          {/* <div className="ml-auto">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div> */}
        </div>

        <div
          className="h-full hide-scrollbar-custom bg-no-repeat bg-center bg-cover pt-[6.5rem] pb-[5rem] px-1"
          style={{ backgroundImage: `url("/5906153.jpg")` }}
        >
          {messages.map((message) => (
            <p
              className={`relative pt-5 px-2 pb-[0.375rem] text-base mb-3 bg-white rounded-xl w-fit ${
                message.name === user.displayName && `orange-bg`
              }`}
            >
              <span
                className={`absolute top-2 font-bold text-xs text-blue-500 ${
                  message.name === user.displayName && "text-white"
                }`}
              >
                {message.name}
              </span>
              {message.message}
              <span className="ml-3 text-xs font-bold">
                {getDate(new Date(message.timestamp?.toDate()))}
              </span>
            </p>
          ))}
        </div>

        <div className="flex w-full lg:w-2/3 fixed bottom-0 bg-white">
          <form className="flex justify-between w-full px-3 py-3 lg:py-[0.8rem]">
            <input
              className="bg-white w-full focus:outline-none"
              type="text"
              placeholder="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>

            <button
              type="submit"
              onClick={sendMessage}
              className="gap-1 cursor-pointer text-sm font-semibold px-4 py-2 transition ease-out transform hover:scale-95 duration-75 flex justify-center items-center rounded-full shadow-md shadow-gray-500 bg-rose-400 text-white"
            >
              Send
              <div className="w-6 h-6">
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.455 9.8834L7.063 4.1434C6.76535 3.96928 6.40109 3.95274 6.08888 4.09916C5.77667 4.24558 5.55647 4.53621 5.5 4.8764C5.5039 4.98942 5.53114 5.10041 5.58 5.2024L7.749 10.4424C7.85786 10.7903 7.91711 11.1519 7.925 11.5164C7.91714 11.8809 7.85789 12.2425 7.749 12.5904L5.58 17.8304C5.53114 17.9324 5.5039 18.0434 5.5 18.1564C5.55687 18.4961 5.77703 18.7862 6.0889 18.9323C6.40078 19.0785 6.76456 19.062 7.062 18.8884L18.455 13.1484C19.0903 12.8533 19.4967 12.2164 19.4967 11.5159C19.4967 10.8154 19.0903 10.1785 18.455 9.8834V9.8834Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
