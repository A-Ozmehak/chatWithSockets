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
  enterBtn.innerHTML = "Log in";

  let listOfRooms = document.createElement("ul");
  listOfRooms.id = "listRooms";
  let listElement = document.createElement("li");
  listElement.id = "listWithRooms";
  sideContainer.append(listOfRooms);
  listOfRooms.append(listElement);

  enterBtn.addEventListener("click", () => {
    const room = roomInput.value;

    listElement.textContent = roomInput.value;

    if (!room.length) {
      return;
    }
    socket.emit("join", room);
  });

  // sideContainer.append(roomContainer);
  // mainContainer.append(sideContainer, rheader);
  // roomContainer.append(roomInputHeader, roomInput, enterBtn);
  // document.body.append(mainContainer);

  sideContainer.append(roomInputHeader, roomInput, enterBtn);
  mainContainer.append(rheader, sideContainer);
  roomContainer.append(mainContainer);
  document.body.append(roomContainer);
  layout();
}

function renderMessageForm() {
  document.body.innerHTML = "";

  let icon = document.createElement("i");
  icon.classList.add("signOut");
  icon.innerHTML =
    '<i id="signOutIcon" class="fa-solid fa-arrow-right-from-bracket"></i>';

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

  let listOfRooms = document.createElement("ul");
  listOfRooms.id = "listRooms";
  let listElement = document.createElement("li");
  listElement.id = "listWithRooms";
  listOfRooms.append(listElement);

  let chatForm = document.createElement("form");
  chatForm.id = "chatForm";
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput.value.length) {
      socket.emit("message", chatInput.value, joinedRoom);
      chatForm.reset();
    } else {
    }
  });

  let sendButton = document.createElement("button");
  sendButton.id = "sendButton";
  sendButton.innerHTML = "Send";

  // chatForm.append(chatInput, sendButton);
  // sideContainer.append(roomContainer, listOfRooms);
  // mainContainer.append(rheader, chatForm, chatList);
  // roomContainer.append(mainContainer, sideContainer);
  // document.body.append(roomContainer);

  sideContainer.append(roomContainer, listOfRooms, icon);
  mainContainer.append(chatList, chatForm);
  mainContent.append(sideContainer, rheader, mainContainer);
  chatForm.append(chatInput, sendButton);
  roomContainer.append(roomInputHeader);
  document.body.append(mainContent);

  // mainContainer.append(rheader, chatList, chatForm, inputButton);
  // rcontainer.append(mainContainer);
  // document.body.append(rcontainer);
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
  console.log(rooms);
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

  //joinedRoom = room;
  //renderMessageForm();
});

socket.on("connected", (nickname) => {
  nickname = nickname;
  renderRoomInput();
});
