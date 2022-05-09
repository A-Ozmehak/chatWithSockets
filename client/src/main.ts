import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import layout from "../layout/layout";
import "./room.css";
import "./chat.css";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

let savedRoomList: string[] = [];
let savedNick: string;
let joinedRoom: string;

window.addEventListener("load", () => {
  renderNameInput();
  layout();
});

//Renders the form for nickname
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
    savedNick = nickNameInput.value;

    socket.auth = { nickname: nickNameInput.value };
    socket.connect();

  });
  container.append(inputContent);
  inputContent.append(nickNameInputHeader, nickNameInput, logInBtn);
  document.body.append(header, container);
}

//Renders the page where you create a room
function createRoom() {
  document.body.innerHTML = "";

  let createRoomContainer = document.createElement('aside');
  createRoomContainer.id = 'sideContainer';

  let welcomeMsg = document.createElement("p");
  welcomeMsg.innerText = `Welcome ${savedNick}`;

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
  createRoomContainer.append(welcomeMsg, roomInput, enterBtn, logOutBtn);
  document.body.append(createRoomContainer);
}

//Renders the list with all the rooms
function roomsList() {
  let aside = document.createElement('aside');
  aside.id = 'sideContainer';

  let rheader = document.createElement("div");
  rheader.id = "rheader";

  let roomInputHeader = document.createElement("h2");
  roomInputHeader.innerHTML = "Rooms";

  let listContent = document.createElement('ul');
  listContent.id = "listContent";

  savedRoomList.forEach(el => {
    let listOfRooms = document.createElement('li');
    listOfRooms.innerText = el;
    listContent.append(listOfRooms);
  })

  let leaveBtn = document.createElement("button");
  leaveBtn.id = "leaveBtn";
  leaveBtn.innerHTML = "Leave room";

  leaveBtn.addEventListener("click", () => {
    socket.emit("leave");
    createRoom()
  });

  aside.append(roomInputHeader, listContent, leaveBtn)
  document.body.append(aside, rheader);
}

//Renders the chat page with a form and the chat boxes
function renderMessageForm() {
  document.body.innerHTML = "";
  roomsList()

  let mainContainer = document.createElement("main");
  mainContainer.id = "mainContainer";

  let rheader = document.createElement("div");
  rheader.id = "rheader";

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
  });

  let sendButton = document.createElement("button");
  sendButton.id = "sendButton";
  sendButton.innerHTML = "Send";

  mainContainer.append(chatList, chatForm);
  chatForm.append(rheader, chatInput, sendButton);
  document.body.append(mainContainer);
}


//Error if invalid nickname
socket.on("connect_error", (err) => {
  if (err.message == "Invalid nickname") {
    alert("Invalid nickname");
  }
});

socket.on("_error", (errorMessage) => {
  console.log(errorMessage);
});

socket.on("roomList", (rooms) => {
 // let aside = document.getElementById("sideContainer") as HTMLElement;
 //  let list = document.getElementById("roomList");

  // for (let i = 0; i < rooms.length; i++) {
  //   const el = document.createElement("li");
  //   el.innerHTML = `${rooms[i]}`;
  //   el.addEventListener("click", () => {
  //     socket.emit("join", rooms[i]);
  //   });
  //
  //   if (list) {
  //     list.append(el);
  //     aside.append(list);
  //   }

  // }

  savedRoomList = rooms;
  console.log(rooms)
});

//Renders the form for the chat when the user has joined a room
socket.on("joined", (room) => {
  alert("you have joined room: " + room);
  console.log("Joined Room", room);
  joinedRoom = room;

  let mainContainer = document.getElementById('mainContainer')
  if (mainContainer) {
    let roomsName = document.createElement('p');
    roomsName.innerHTML = room;
    mainContainer.append(roomsName)
  }

  console.log(room)

  renderMessageForm();
});

//Prints out the nickname and the chatmessage
socket.on("message", (message, from) => {
  const chatItem = document.createElement("li");
  chatItem.id = "chatItem";
  chatItem.textContent = from.nickname + ": " + message;
  console.log("hejsan");

  const messageList = document.getElementById("messages");
  if (messageList) {
    messageList.append(chatItem);
  }
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("connected", (nickname) => {
  console.log(nickname);
  nickname = nickname;

  const usersList = document.getElementById("usersList");
  if (usersList) {
    const listElement = document.createElement("li");
    usersList.append(listElement);
    listElement.textContent = nickname;
  }
  createRoom()
});

//Shows when user disconnects in the console
socket.on("disconnect", (nickname) => {
  console.log("user disconnected");
  console.log(nickname);
});
