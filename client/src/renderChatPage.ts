import { createRoom } from "./createRoom";
import { IOSocket } from "./main";
import { renderMessageForm } from "./renderMessageForm";

// let rooms: string[] = [];

export function renderChatPage(socket: IOSocket, rooms: string[]) {
  document.body.innerHTML = "";

  renderHeader();
  renderAside(socket, rooms);
}

function renderAside(socket: IOSocket, rooms: string[]) {
  const aside = document.createElement("aside");
  aside.id = "aside";
  // TODO: styla aside mm...
  document.body.append(aside);

  createRoom(aside, socket);
  renderRoomsList(rooms, socket, aside);
}

export function renderMain(socket: IOSocket) {
  const main = document.createElement("main");
  main.id = "main";
  renderMessageForm(main, socket);
  document.body.append(main);
}

function renderHeader() {
  const header = document.createElement("header");
  header.id = "rheader";
  document.body.append(header);
}

export function renderRoomsList(
  rooms: string[],
  socket: IOSocket,
  aside?: HTMLElement
) {
  aside = aside || document.querySelector("aside")!;
  const ul = aside.querySelector("ul") || document.createElement("ul");
  ul.innerHTML = "";
  rooms.forEach((room) => {
    let listItem = document.createElement("li");
    listItem.innerText = room;
    let i = 0;
    listItem.addEventListener("click", () => {
      socket.emit("join", rooms[i]);
    });
    ul.append(listItem);
  });

  aside.append(ul);
}
