import "./style.css";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";
import { renderRoomsList } from "./renderChatPage";
import { renderStartPage, savedNick } from "./renderStartPage";
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

  renderMain(socket, room);
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


socket.on("typing", (savedNick: any, chatInput: string | any[]) => {
    let typingCheck = document.getElementById("userIsTyping");
    if (chatInput.length > 1) {
        typingCheck!.textContent = `${savedNick} is typing a message`;
    }
    if (chatInput.length < 1) {
        typingCheck!.textContent = `noone is typing`;
    }
    }
)

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
  renderChatPage(socket, rooms)
});
