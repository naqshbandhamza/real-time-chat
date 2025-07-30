import ChatList from "../ChatList"
import ChatWindow from "../ChatWindow"
import { Navigate } from "react-router-dom";
import { useState } from "react";


export default function DashboardLayout() {

  console.log("dashboard layout rendered")
  const token = localStorage.getItem("token");
  const [activeChat, setActiveChat] = useState(null); // { email }


  if (!token)
    return <Navigate to="/" replace />;

  const user = JSON.parse(token)

  return (
    <div className="flex h-screen">
      <ChatList user={user} onSelectChat={setActiveChat} />
      {activeChat ? (
        <ChatWindow user={user} partner={activeChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a chat
        </div>
      )}
    </div>
  )
}