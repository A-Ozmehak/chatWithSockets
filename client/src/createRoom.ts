import { IOSocket } from "./main";
import { renderStartPage } from "./renderStartPage";
import "./style.css";
import { savedNick } from "./renderStartPage";

export function createRoom(aside: HTMLElement, socket: IOSocket) {
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
    if (roomInput.value.length === 0) {
      console.log("Enter a room name");
    }
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

  aside.append(welcomeMsg, roomInput, enterBtn, profile);
  profile.append(profileName, logOutBtn);
}
