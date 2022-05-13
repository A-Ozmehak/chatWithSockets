import { IOSocket } from "./main";
import { createRoom } from "./createRoom";

export function leaveButton(aside: HTMLElement, socket: IOSocket) {
  let leaveBtn = document.createElement("button");
  leaveBtn.id = "leaveBtn";
  leaveBtn.innerHTML = "Leave room";

  leaveBtn.addEventListener("click", () => {
    socket.emit("leave");
    aside.innerHTML = "";
    createRoom(aside, socket);
  });
  aside.append(leaveBtn);
}
