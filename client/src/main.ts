import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import { renderRoomsList } from "./renderChatPage";
import { renderStartPage } from "./renderStartPage";
import { renderChatPage } from "./renderChatPage";
import { renderMain } from "./renderChatPage";
import "./room.css";
import "./chat.css";

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
  alert("you have joined room: " + room);
  console.log("Joined Room", room);
  joinedRoom = room;

  renderMain(socket);
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

socket.on("connected", (nickname, rooms) => {
  console.log(nickname);
  nickname = nickname;

  // const usersList = document.getElementById("usersList");
  // if (usersList) {
  //   const listElement = document.createElement("li");
  //   usersList.append(listElement);
  //   listElement.textContent = nickname;
  // }

  renderChatPage(socket, rooms);
});

//Shows when user disconnects in the console
socket.on("disconnect", (nickname) => {
  console.log("user disconnected");
  console.log(nickname);
});

socket.on("left", () => {
  console.log("left room");
  joinedRoom = "";
  // TODO: rendera om gränssnitt
  //  createRoom(aside, socket)
});
