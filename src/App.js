import React from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import Chat from "./components/Chat";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <>
          {/* *****Large Screen**** */}
          <div className="hidden lg:flex h-screen w-screen">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Sidebar showChat={true} />} />
                <Route path="/rooms/:roomId" element={<Chat />} />
              </Routes>
            </BrowserRouter>
          </div>
          {/* ******Small Screen**** */}
          <div className="flex lg:hidden h-screen w-screen">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Sidebar showChat={false} />} />
                <Route path="/rooms/:roomId" element={<Chat />} />
              </Routes>
            </BrowserRouter>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
