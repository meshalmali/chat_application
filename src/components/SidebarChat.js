import React, { useEffect, useState } from "react";

import db from "../firebase";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const deleteRoom = (roomId) => {
    const toDelete = prompt(
      `Are you sure you want to delete the Room? Please type "Yes"`
    );

    if (toDelete.toLowerCase() === "yes") {
      db.collection("rooms").doc(roomId).delete();
    }
  };

  return !addNewChat ? (
    <div className="flex items-center gap-8 px-6 lg:px-12 py-2 border-b border-slate-100 hover:shadow-lg hover:bg-rose-100">
      <Link to={`/rooms/${id}`} className="w-full">
        <div className="flex items-center gap-8">
          <img
            src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&backgroundType=gradientLinear`}
            className="w-12 h-12 rounded-full shadow-xl"
            alt="abc"
          />
          <div className="text-slate-800 font-semibold">{name}</div>
        </div>
      </Link>

      <div
        className="ml-auto"
        onClick={() => {
          deleteRoom(id);
        }}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
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
