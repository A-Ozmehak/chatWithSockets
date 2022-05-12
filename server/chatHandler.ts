import { getRooms } from "./rooms";
import type { IOServer, IOSocket } from "./server";

export default (io: IOServer, socket: IOSocket) => {
  socket.on("join", (room) => {
    leaveRooms(socket);

    const broadcastRooms: boolean = !getRooms(io).includes(room);
    socket.join(room);

    // Skicka ut rumslista endast när ett nytt rum skapats
    if (broadcastRooms) {
      io.emit("roomList", getRooms(io));
    }

    socket.emit("joined", room);
  });
  socket.on("message", (message, to) => {
    if (!socket.data.nickname) {
      return socket.emit("_error", "Missing nickname on socket...");
    }
    io.to(to).emit(
      "typing",
      {
        id: socket.id,
        nickname: socket.data.nickname,
      },
      false
    );
    io.to(to).emit("message", message, {
      id: socket.id,
      nickname: socket.data.nickname,
    });
    console.log(message);
  });
  socket.on("leave", () => {
    leaveRooms(socket);
    socket.emit("left", getRooms(io));
  });
  socket.on("typing", (user, to, isTyping) => {
    if (!socket.data.nickname) {
      return socket.emit("_error", "Missing nickname on socket...");
    }
    io.to(to).emit(
      "typing",
      {
        id: socket.id,
        nickname: socket.data.nickname,
      },
      isTyping
    );
  });
};

const leaveRooms = (socket: IOSocket) => {
  socket.rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room);
    }
  });
};
