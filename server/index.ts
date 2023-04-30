import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "../typings";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on(
  "connection",
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log(socket.id);
    console.log("Client connected");
    socket.on("clientMsg", (data) => {
      console.log(data);
    //   for all
    //   io.sockets.emit("serverMsg", data);
    // all except the source of broadcast
    // socket.broadcast.emit("serverMsg", data);

    // if 
    if(data.room === '') {
        io.sockets.emit("serverMsg", data);
    } else {
        socket.join(data.room);
        io.to(data.room).emit("serverMsg", data);
    }
    
    });
  }
);

server.listen(3000);
