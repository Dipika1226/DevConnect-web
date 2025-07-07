import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([
    { text: "hello" },
    { text: "what is going on" },
  ]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="w-[70vw] mx-auto my-[5vh] h-[80vh] border border-gray-700 relative">
      <h1 className="border-b border-gray-700 px-[45%] py-2 font-semi-bold text-xl">
        Chat
      </h1>
      <div className="overflow-y-scroll h-[63vh] border-b border-gray-700">
        {messages.map((msg, index) => {
          return (
            <div key={index} class="chat chat-start p-3">
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div class="chat-header">
                Obi-Wan Kenobi
                <time class="text-xs opacity-50">12:45</time>
              </div>
              <div class="chat-bubble">{msg.text}</div>
              <div class="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-4 w-[68vw] flex">
        <input type="text" className="bg-base-300 w-[90%] p-2  mx-4"></input>
        <button className="bg-blue-700 btn px-6">Send</button>
      </div>
    </div>
  );
};

export default Chat;
