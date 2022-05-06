import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import layout from "../layout/layout";
import "./room.css";
import "./chat.css";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

let roomList: string[];
// let nickname: string;
let joinedRoom: string;

window.addEventListener("load", () => {
  renderNameInput();
  layout();
});

//Get nickname input
function renderNameInput() {
  document.body.innerHTML = "";

  let header = document.createElement("div");
  header.id = "header";

  let container = document.createElement("div");
  container.id = "container";

  let inputContent = document.createElement("div");
  inputContent.id = "inputContent";

  let nickNameInputHeader = document.createElement("h2");
  nickNameInputHeader.innerHTML = "Enter your nickname";

  let nickNameInput = document.createElement("input");
  nickNameInput.id = "nickNameInput";

  let logInBtn = document.createElement("button");
  logInBtn.id = "logInButton";
  logInBtn.innerHTML = "Continue";

  logInBtn.addEventListener("click", () => {
    socket.auth = { nickname: nickNameInput.value };
    socket.connect();
  });
  container.append(inputContent);
  inputContent.append(nickNameInputHeader, nickNameInput, logInBtn);
  document.body.append(header, container);
}

export function renderRoomInput() {
  document.body.innerHTML = "";

  let roomContainer = document.createElement("div");
  roomContainer.id = "roomContainer";

  let mainContainer = document.createElement("div");
  mainContainer.id = "mainContainer";

  let sideContainer = document.createElement("div");
  sideContainer.id = "sideContainer";

  let rheader = document.createElement("div");
  rheader.id = "rheader";

  let roomInputHeader = document.createElement("h2");
  roomInputHeader.innerHTML = "Room name";

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
    return renderNameInput();
  });

  sideContainer.append(roomInputHeader, roomInput, enterBtn, logOutBtn);
  mainContainer.append(rheader, sideContainer);
  roomContainer.append(mainContainer);
  document.body.append(roomContainer);
  layout();
}

function renderMessageForm() {
  document.body.innerHTML = "";

  let leaveBtn = document.createElement("button");
  leaveBtn.id = "leaveBtn";
  leaveBtn.innerHTML = "Leave room";

  let roomContainer = document.createElement("div");
  roomContainer.id = "roomContainer";

  let mainContainer = document.createElement("div");
  mainContainer.id = "mainContainer";

  let mainContent = document.createElement("div");
  mainContent.id = "mainContent";

  let sideContainer = document.createElement("div");
  sideContainer.id = "sideContainer";

  let rheader = document.createElement("div");
  rheader.id = "rheader";

  let roomInputHeader = document.createElement("h2");
  roomInputHeader.innerHTML = "Rooms";

  let chatList = document.createElement("ul");
  chatList.id = "messages";

  let chatInput = document.createElement("input");
  chatInput.id = "chatInput";
  chatInput.autocomplete = "off";

  let chatForm = document.createElement("form");
  chatForm.id = "chatForm";
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput.value.length) {
      socket.emit("message", chatInput.value, joinedRoom);
      chatForm.reset();
    } else {
    }
    // const rooms = room
    //  socket.emit("join", rooms);
  });

  leaveBtn.addEventListener("click", () => {
    // if (!user.length) {
    //   socket.delete
    // }
    return renderRoomInput();
    // socket.leave(room);
  });

  let sendButton = document.createElement("button");
  sendButton.id = "sendButton";
  sendButton.innerHTML = "Send";

  sideContainer.append(roomContainer, leaveBtn);
  mainContainer.append(chatList, chatForm);
  mainContent.append(sideContainer, rheader, mainContainer);
  chatForm.append(chatInput, sendButton);
  roomContainer.append(roomInputHeader);
  document.body.append(mainContent);
}

socket.on("connect_error", (err) => {
  if (err.message == "Invalid nickname") {
    alert("Invalid nickname");
  }
});

socket.on("_error", (errorMessage) => {
  console.log(errorMessage);
});

socket.on("roomList", (rooms) => {
  let aside = document.getElementById("sideContainer") as HTMLElement;
  const list = document.createElement("ul");
  const el = document.createElement("li");
  const br = document.createElement("br");
  aside.append(list);
  for (let i = 0; i < rooms.length; i++) {
    list.append(el);
    el.innerHTML = `${rooms[i]}`;
    el.append(br);
  }
  console.log(rooms, "------------");
});

socket.on("joined", (room) => {
  alert("you have joined room: " + room);
  console.log("Joined Room", room);
  joinedRoom = room;
  renderMessageForm();
});

socket.on("message", (message, from) => {
  const chatItem = document.createElement("li");
  chatItem.id = "chatItem";
  chatItem.textContent = from.nickname + ": " + message;

  const messageList = document.getElementById("messages");
  if (messageList) {
    messageList.append(chatItem);
  }
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("connected", (nickname) => {
  console.log(nickname);
  nickname = nickname;
  renderRoomInput();
});

socket.on("disconnect", (nickname) => {
  console.log("user disconnected");
  console.log(nickname);
});
