import { IOSocket } from "./main";

export function leaveButton(aside: HTMLElement, socket: IOSocket) {
  let leaveBtn = document.createElement("button");
  leaveBtn.id = "leaveBtn";
  leaveBtn.innerHTML = "Leave room";

  leaveBtn.addEventListener("click", () => {
    socket.emit("leave");
    // createRoom(socket);
  });
  aside.append(leaveBtn);
}
