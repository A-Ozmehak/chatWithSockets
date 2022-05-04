import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

let nickname: string;
let joinedRoom: string;

window.addEventListener("load", () => {
  renderNameInput();
});

function renderNameInput() {
  document.body.innerHTML = "";

  let header = document.createElement("div");
  header.id = "header";

  let container = document.createElement("div");
  container.id = "container";

  let inputContent = document.createElement("div");
  inputContent.id = "inputContent";

  let nickNameInputHeader = document.createElement("h3");
  nickNameInputHeader.innerHTML = "ENTER YOUR NICKNAME";

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

function renderRoomInput() {
  document.body.innerHTML = "";

  let container = document.createElement("div");
  let roomInputHeader = document.createElement("h3");
  roomInputHeader.innerHTML = "Room name";

  let roomInput = document.createElement("input");

  let enterBtn = document.createElement("button");
  enterBtn.innerHTML = "Log in";
  enterBtn.addEventListener("click", () => {
    const room = roomInput.value;
    if (!room.length) {
      return;
    }
    socket.emit("join", room);
  });
  container.append(roomInputHeader, roomInput, enterBtn);
  document.body.append(container);
}

function renderMessageForm() {
  document.body.innerHTML = "";

  let chatList = document.createElement("ul");
  chatList.id = "messages";

  let chatInput = document.createElement("input");
  chatInput.autocomplete = "off";

  let chatForm = document.createElement("form");
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput.value.length) {
      socket.emit("message", chatInput.value, joinedRoom);
    } else {
    }
  });
  let sendButton = document.createElement("button");
  sendButton.innerHTML = "Send";

  chatForm.append(chatInput, sendButton);
  document.body.append(chatList, chatForm);
}

socket.on("connect_error", (err) => {
  if (err.message == "Invalid nickname") {
    console.log("Tryck again");
  }
});

socket.on("_error", (errorMessage) => {
  console.log(errorMessage);
});

socket.on("roomList", (rooms) => {
  console.log(rooms);
});

socket.on("joined", (room) => {
  console.log("Joined Room", room)
    joinedRoom = room;
    renderMessageForm();
  });

  socket.on("connected", (nickname) => {
    nickname = nickname;
    renderRoomInput();
  });

  socket.on("message", (message, from) => {
    const chatItem = document.createElement("li");
    chatItem.textContent = from.nickname + ": " + message;

    const messageList = document.getElementById("messages");
    if (messageList) {
      messageList.append(chatItem);
    }
    window.scrollTo(0, document.body.scrollHeight);
});
