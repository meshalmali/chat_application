import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./ChatApp.css";

function ChatApp() {
  return (
    <div className="chatApp">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default ChatApp;
