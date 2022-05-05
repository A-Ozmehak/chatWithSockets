import { socket } from "./../main.ts";

let joinedRoom: string;

function layout(socket) {
  const container = document.createElement("div");
  container.id = "container";
  let header = document.createElement("header");
  header.id = "header";
  let title = document.createElement("h1");
  title.innerHTML = "Chit & Chat";

  container.append(header, title);
  document.body.append(container);
}

export function aside(socket) {
  let sideContainer = document.createElement("div");
  sideContainer.id = "sideContainer";

  let roomInputHeader = document.createElement("h2");
  roomInputHeader.innerHTML = "Room name";

  let roomInput = document.createElement("input");
  roomInput.id = "roomInput";

  let enterBtn = document.createElement("button");
  enterBtn.id = "enterBtn";
  enterBtn.innerHTML = "Log in";
  enterBtn.addEventListener("click", () => {
    const room = roomInput.value;
    if (!room.length) {
      return;
    }
    console.log("join");
    console.log(socket);
    socket.emit("join", room);
  });
  sideContainer.append(roomInputHeader, roomInput, enterBtn);
  // sideContainer.append(roomInputHeader, roomInput, enterBtn);
  document.body.append(sideContainer);
}

socket.on("joined", (room) => {
  console.log("Joined Room", room);
  joinedRoom = room;
});

socket.on("connected", (nickname) => {
  nickname = nickname;
});

socket.on("roomList", (rooms) => {
  console.log(rooms);
});
