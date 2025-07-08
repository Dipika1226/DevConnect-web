import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-[70vw] mx-auto my-[5vh] h-[80vh] border border-gray-700 relative">
      <h1 className="border-b border-gray-700 px-[45%] py-2 font-semi-bold text-xl">
        Chat
      </h1>
      <div
        ref={scrollRef}
        className="overflow-auto h-[63vh] border-b border-gray-700"
      >
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
                {msg.firstName + " " + msg.lastName}
                <time class="text-xs opacity-50">12:45</time>
              </div>
              <div class="chat-bubble">{msg.text}</div>
              <div class="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <form
        className="absolute bottom-4 w-[68vw] flex"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          type="text"
          className="bg-base-300 w-[90%] p-2  mx-4"
        ></input>
        <button onClick={sendMessage} className="bg-blue-700 btn px-6">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
