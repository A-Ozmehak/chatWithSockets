import { createRoom } from "./createRoom";
import { IOSocket } from "./main";

export function renderChatPage(socket: IOSocket) {
  document.body.innerHTML = "";

  renderMain();
  renderHeader();
  renderAside(socket);
}

function renderAside(socket: IOSocket) {
  const aside = document.createElement("aside");
  aside.id = "aside";
  // TODO: styla aside mm...
  document.body.append(aside);

  // renderHeader();
  renderRoomsList(aside, []);
  // renderButtonSegment();
  createRoom(aside, socket);
}

function renderMain() {
  const main = document.createElement("main");
  main.id = "main";
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
