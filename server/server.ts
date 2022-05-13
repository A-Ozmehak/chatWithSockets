import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData,
} from "../types";
import { getRooms } from "./rooms";
import registerChatHandler from "./chatHandler";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData
>();

export type IOServer = typeof io;
export type IOSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

io.use((socket, next) => {
  const nickname: string = socket.handshake.auth.nickname;
  if (!nickname || nickname.length < 3) {
    return next(new Error("Invalid nickname"));
  }
  socket.data.nickname = nickname;
  next();
});

io.on("connection", (socket) => {
  if (socket.data.nickname) {
    socket.emit("connected", socket.data.nickname, getRooms(io));
  }
  registerChatHandler(io, socket);
});

io.listen(4000);
