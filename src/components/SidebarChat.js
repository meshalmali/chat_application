import React, { useEffect, useState } from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar } from "@mui/material";
import db from "../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter Room name");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="flex items-center gap-8 px-6 lg:px-12 py-2 border-b border-slate-100 hover:shadow-lg hover:bg-rose-100">
        <img
          src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&backgroundType=gradientLinear`}
          className="w-12 h-12 rounded-full shadow-xl"
        />
        <div className="text-slate-800 font-semibold">{name}</div>
      </div>
    </Link>
  ) : (
    <div
      className="fixed z-30 lg:fixed bottom-6 right-6 lg:right-[70%] cursor-pointer text-base lg:text-lg font-semibold px-4 lg:px-5 py-3 transition ease-out transform hover:scale-95 duration-75 flex justify-center items-center rounded-3xl lg:rounded-full shadow-md shadow-slate-700 bg-gradient-to-r from-yellow-500 to-pink-700 text-white"
      onClick={createChat}
    >
      <h2>Add new Room</h2>
    </div>
  );
}

export default SidebarChat;
