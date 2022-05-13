import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import { joinRoom, renderRoomsList } from "./renderChatPage";
import { renderStartPage } from "./renderStartPage";
import { renderChatPage } from "./renderChatPage";
import { renderMain, renderTypingMessage } from "./renderChatPage";
import "./room.css";
import "./chat.css";
import { leaveButton } from "./leaveButton";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

export type IOSocket = typeof socket;

let savedRoomList: string[] = [];
let joinedRoom: string;

window.addEventListener("load", main);

function main() {
  renderStartPage(socket);
}

socket.on("roomList", (rooms) => {
  savedRoomList = rooms;
  renderRoomsList(rooms, socket);
  console.log(rooms);
});

//Renders the form for the chat when the user has joined a room
socket.on("joined", (room) => {
  console.log("Joined Room", room);
  joinedRoom = room;
  const aside = document.querySelector("aside")!;

  // aside.innerHTML = "";
  leaveButton(aside, socket);

  //Prints out what room your in, doesn't work if you change room tho
  let roomName = document.createElement("p");
  roomName.innerHTML = "You're in room:" + "<br />" + `${room}`;
  aside.append(roomName);
  // const rooms = savedRoomList.slice();
  // const ul = aside.querySelector("ul") || document.createElement("ul");
  // ul.innerHTML = "";
  // for (let i = 0; i < rooms.length; i++) {
  //   let listItem = document.createElement("li");
  //   listItem.id = "roomList";
  //   listItem.innerText = `${rooms[i]}`;
  //   listItem.addEventListener("click", () => {
  //     renderChatPage(socket, rooms);
  //     socket.emit("join", rooms[i]);
  //   });

  //   ul.append(listItem);
  //   console.log("roomlist", rooms);
  //   aside.append(ul);
  // }

  renderMain(socket, room);
  joinRoom();
  // renderRoomsList(socket, aside)
});

//Prints out the nickname and the chatmessage
socket.on("message", (message, from) => {
  let messageList = document.getElementById("messages");
  const chatItem = document.createElement("li");
  chatItem.id = "chatItem";
  chatItem.textContent = from.nickname + ": " + message;

  if (messageList) {
    messageList.append(chatItem);
  }
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("connected", (nickname, rooms) => {
  console.log(nickname);
  nickname = nickname;
  renderChatPage(socket, rooms);
});

//Shows when user disconnects in the console
socket.on("disconnect", (nickname) => {
  console.log("user disconnected");
  console.log(nickname);
});

socket.on("left", (rooms) => {
  console.log("left room");
  joinedRoom = "";
  renderChatPage(socket, rooms);
});

socket.on("typing", (user, isTyping) => {
  let typingMessage = user.nickname + " is typing...";
  if (isTyping === false) {
    typingMessage = "";
  }
  console.log(isTyping);
  renderTypingMessage(socket, typingMessage, user.id);
});
