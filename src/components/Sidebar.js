import React, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useStateValue } from "../context/StateProvider";
import Chat from "./Chat";

function Sidebar({ showChat }) {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // console.log(
    //   "I am user",
    //   user?.multiFactor.user,
    //   user?.multiFactor.user.photoURL
    // );
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div
        className={`${
          showChat ? "w-1/3" : "w-screen"
        } h-screen hide-scrollbar-custom`}
      >
        <div
          className="flex items-center gap-4 p-4 bg-no-repeat bg-center bg-cover fixed top-0 right-0 w-full lg:z-10"
          style={{ backgroundImage: `url("/5906153.jpg")` }}
        >
          <div
            className="h-14 w-14 rounded-full bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/a-/AFdZucraOj33hJLiqLVRW9womKQDuH1Z82JiyWGZiS_wxZ4=s96-c")`,
            }}
          ></div>
          <span className="text-black bg-white bg-opacity-10 p-3 rounded-xl overflow-hidden backdrop-blur-md shadow-custom font-semibold text-lg">
            {user?.multiFactor.user.displayName}
          </span>
        </div>

        <div className="flex flex-col mt-[5.5rem]">
          <SidebarChat addNewChat />
          {rooms.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
      {showChat && (
        <div className="hidden lg:z-20 lg:w-2/3 lg:flex h-screen">
          <div
            className="bg-no-repeat bg-center bg-cover w-full"
            style={{ backgroundImage: `url("/5906153.jpg")` }}
          >
            <div className="w-full h-full bg-white bg-opacity-20 backdrop-blur-lg flex items-center justify-center">
              <div className="flex flex-col h-full items-center justify-center">
                <div className="text-orange-400 font-black text-3xl lg:text-3xl shadow-custom text-center">
                  Click on a Room to get started!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
