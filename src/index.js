const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use("/", require("./routers"));

require("./dbs/init.mongodb");

let users = [1, 2, 3]; // { userId: { socketId, room } }
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room) => {
    // Join the room
    socket.join(room);
    // Log the room join
    console.log(`User joined room: ${room}`);
    // Notify the client that they have joined the room
    socket.emit("notification", { message: `You've joined room ${room}` });
  });

  socket.on("message", ({ cleanId, roomId, message }) => {
    // Send message to all users in the room
    console.log({ message });
    console.log({ roomId });
    console.log({ cleanId });

    io.to(roomId).emit("message", { cleanId, message });
    io.to(roomId).emit("notification", { message: "New notification!" });
  });

  // Listen for global notification events
  socket.on("globalNotification", ({ email, message }) => {
    // Send notification to all connected clients
    io.emit("notification", { email: email, message: message });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
