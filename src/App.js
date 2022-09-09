import "./App.css";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatApp from "./components/ChatApp";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Sidebar />} />
              <Route path="/rooms/:roomId" element={<ChatApp />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
