import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
});

io.on('connection', (socket) => {
    console.log(socket.id);
});

server.listen(3000)