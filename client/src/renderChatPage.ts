import { createRoom } from "./createRoom";
import { IOSocket } from "./main";
import { renderMessageForm } from "./renderMessageForm";
import "./chat.css";

export function renderChatPage(socket: IOSocket, rooms: string[]) {
  document.body.innerHTML = "";

  renderAside(socket, rooms);
  // renderMain(socket);
}

function renderAside(socket: IOSocket, rooms: string[]) {
  const aside = document.createElement("aside");
  aside.id = "aside";
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
    listItem.innerText = `${rooms[i]}`;
    listItem.addEventListener("click", () => {
      socket.emit("join", rooms[i]);
    });
    // rooms.forEach((room) => {
    //   let i = 1;
    //   let listItem = document.createElement("li");
    //   listItem.innerText = room;
    //   listItem.addEventListener("click", () => {
    //     socket.emit("join", rooms[i]);
    //   });
    ul.append(listItem);
    // });

    aside.append(ul);
  }
}
