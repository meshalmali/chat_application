import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
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
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg?background=%64FFA3`}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p></p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
