import { createRoom } from "./createRoom";
import { IOSocket } from "./main";
import { renderMessageForm } from "./renderMessageForm";

let rooms: string[] = [];

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
  renderRoomsList(aside, rooms);
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

function renderRoomsList(aside: HTMLElement, rooms: string[]) {
  const ul = aside.querySelector("ul") || document.createElement("ul");
  ul.innerHTML = "";

  // for each room
  // const li = document.createElement('li');
  // add li to ul
  rooms.forEach((room) => {
    let listItem = document.createElement("li");
    listItem.innerText = room;
    // todo: listOfRooms.addEventListener
    ul.append(listItem);
  });

  aside.append(ul);
}
