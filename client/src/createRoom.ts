import { IOSocket } from "./main";
import { renderStartPage } from "./renderStartPage";
import "./style.css";
import { leaveButton } from "./leaveButton";
import { savedNick } from "./renderStartPage";

export function createRoom(aside: HTMLElement, socket: IOSocket) {
  let asideHeader = document.createElement("header");
  asideHeader.id = "asideHeader";

  let welcomeMsg = document.createElement("p");
  welcomeMsg.innerText = `Welcome ${savedNick}`;
  welcomeMsg.id = "welcomeMsg";

  let roomInput = document.createElement("input");
  roomInput.id = "roomName";
  let enterBtn = document.createElement("button");
  enterBtn.id = "enterBtn";
  enterBtn.innerHTML = "Create room";

  let profile = document.createElement("div");
  profile.id = "profile";

  let profileName = document.createElement("p");
  profileName.innerHTML = `${savedNick}`;
  profileName.id = "profileName";

  let logOutBtn = document.createElement("button");
  logOutBtn.id = "logOutBtn";
  logOutBtn.innerHTML = "Logout";

  enterBtn.addEventListener("click", () => {
    aside.innerHTML = "";
    const room = roomInput.value;
    leaveButton(aside, socket);

    //Prints out what room your in, doesn't work if you change room tho
    let roomName = document.createElement("p");
    roomName.innerHTML = `Your in room: ${roomInput.value}`;
    aside.append(roomName);

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

  aside.append(asideHeader, welcomeMsg, roomInput, enterBtn, profile);
  profile.append(profileName, logOutBtn);
  // aside.append(roomInput, enterBtn, logOutBtn, welcomeMsg);
}
