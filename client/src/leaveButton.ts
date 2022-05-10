import { IOSocket } from "./main";
import { createRoom } from "./createRoom";

export function leaveButton(socket: IOSocket) {
  let leaveBtn = document.createElement("button");
  leaveBtn.id = "leaveBtn";
  leaveBtn.innerHTML = "Leave room";

  leaveBtn.addEventListener("click", () => {
    socket.emit("leave");
    // createRoom(socket);
  });
  document.body.append(leaveBtn);
}
