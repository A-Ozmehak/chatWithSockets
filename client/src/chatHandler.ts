import { Server, Socket } from "socket.io";
import { getRooms } from "../rooms";

export default (io: Server, socket: Socket) => {
  socket.on("join", (room) => {
    const broadcastRooms: boolean = !getRooms(io).includes(room);
    socket.join(room);

    if (broadcastRooms) {
      io.emit("roomList", getRooms(io));
    }
    socket.emit("joined", room);
  });
  socket.on("message", (message, to) => {
    if (!socket.data.nickname) {
      return socket.emit("_error", "Missing nickname on socket...");
    }
    io.to(to).emit("message", message, {
      id: socket.id,
      nickname: socket.data.nickname,
    });
  });
};
