import { Server } from "socket.io";

//Kan spara chat och rumhistorik
export function getRooms(io: Server) {
  const rooms = [];
  for (let [id, socket] of io.sockets.adapter.rooms) {
    if (!socket.has(id)) {
      rooms.push(id);
    }
  }
  return rooms;
}
