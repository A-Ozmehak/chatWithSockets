import { createRoom } from "./createRoom";
import { IOSocket } from "./main";
import { renderMessageForm } from "./renderMessageForm";
import "./chat.css";

export function renderChatPage(socket: IOSocket, rooms: string[]) {
  document.body.innerHTML = "";

  renderAside(socket, rooms);
}

function renderAside(socket: IOSocket, rooms: string[]) {
  const aside = document.createElement("aside");
  aside.id = "aside";

  let asideHeader = document.createElement("header");
  asideHeader.id = "asideHeader";

  aside.append(asideHeader);
  document.body.append(aside);
  createRoom(aside, socket);
  renderRoomsList(rooms, socket, aside);
}

export function renderMain(socket: IOSocket, room: string) {
  const main = document.createElement("main");
  main.id = "main";

  renderMessageForm(main, socket, room);
  document.body.append(main);
}

export function renderTypingMessage(
  socket: IOSocket,
  typingMessage: string,
  id: string
) {
  let typingParagraph = document.getElementById("typing");
  if (typingParagraph === null) {
    typingParagraph = document.createElement("p");
    typingParagraph.id = "typing";
  }
  // typingParagraph.innerHTML = typingMessage;
  if (socket.id != id) {
    const form = document.getElementById("chatForm");
    typingParagraph.innerHTML = typingMessage;
    form?.append(typingParagraph);
  }
}

export function renderRoomsList(
  rooms: string[],
  socket: IOSocket,
  aside?: HTMLElement
) {
  aside = aside || document.querySelector("aside")!;
  const ul = aside.querySelector("ul") || document.createElement("ul");
  ul.innerHTML = "";
  for (let i = 0; i < rooms.length; i++) {
    let listItem = document.createElement("li");
    listItem.id = "roomList";
    listItem.innerText = `${rooms[i]}`;
    listItem.addEventListener("click", () => {
      renderChatPage(socket, rooms);
      socket.emit("join", rooms[i]);
    });

    ul.append(listItem);
    aside.append(ul);
  }
}

export function joinRoom() {
  let roomInput = document.getElementById("roomName") as HTMLElement;
  roomInput.style.display = "none";

  let createRoomBtn = document.getElementById("enterBtn") as HTMLElement;
  createRoomBtn.style.display = "none";

  let logoutBtn = document.getElementById("logOutBtn") as HTMLElement;
  logoutBtn.style.display = "none";
}
