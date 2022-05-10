import { IOSocket } from "./main";
import { renderStartPage } from "./renderStartPage";
import { aside } from "../layout/aside";
import "./style.css";

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
    const room = roomInput.value;

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
