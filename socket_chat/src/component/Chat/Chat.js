import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import { io } from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT = "http://localhost:3000";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessage] = useState([]);

  console.log(messages);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Connected to server");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...messages, data]);
    });

    socket.on("userJoined", (data) => {
      setMessage([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessage([...messages, data]);
    });

    return () => {
      socket.emit("disconnects");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Socket Chat</h2>
          <a href="/">
            <img src={closeIcon} alt="close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => {
            return (
              <Message
                user={item.id === id ? "" : item.user}
                message={item.message}
                key={i}
                classs={item.id === id ? "right" : "left"}
              />
            );
          })}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            placeholder="Type a message..."
            id="chatInput"
          />
          <button className="sendBtn" onClick={send}>
            <img src={sendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
