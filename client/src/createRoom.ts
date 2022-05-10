import { IOSocket } from "./main";
import { renderStartPage } from "./renderStartPage";
import "./style.css";
import { leaveButton } from "./leaveButton";
import { renderRoomsList } from "./renderRoomsList";

let savedNick: string;

export function createRoom(aside: HTMLElement, socket: IOSocket) {
  let welcomeMsg = document.createElement("p");
  welcomeMsg.innerText = `Welcome ${savedNick}`;

  let roomInput = document.createElement("input");
  roomInput.id = "roomName";

  let enterBtn = document.createElement("button");
  enterBtn.id = "enterBtn";
  enterBtn.innerHTML = "Create room";

  let logOutBtn = document.createElement("button");
  logOutBtn.id = "logOutBtn";
  logOutBtn.innerHTML = "Logout";

  enterBtn.addEventListener("click", () => {
    aside.innerHTML = "";
    const room = roomInput.value;
    renderRoomsList();
    leaveButton(aside, socket);

    if (!room.length) {
      return;
    }
    socket.emit("join", room);
  });

  logOutBtn.addEventListener("click", () => {
    //Delete users
    socket.disconnect();
    return renderStartPage(socket);
  });

  aside.append(welcomeMsg, roomInput, enterBtn, logOutBtn);
}
