const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

const users = [{}];

const app = express();
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} joined the chat`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined the chat!`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat, ${users[socket.id]}`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnects", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left the chat`,
    });
    console.log(`${users[socket.id]} left the chat`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
