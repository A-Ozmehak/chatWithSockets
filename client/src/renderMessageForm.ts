import { IOSocket } from "./main";
import "./chat.css";
import {savedNick} from "./renderStartPage";

let joinedRoom: string;

export function renderMessageForm(main: HTMLElement, socket: IOSocket, room: string) {
  let chatList = document.createElement("ul");
  chatList.id = "messages";
 

  let chatInput = document.createElement("input");
  chatInput.id = "chatInput";
  chatInput.autocomplete = "off";
  chatInput.addEventListener("input", () => {

    socket.emit("typing", savedNick, chatInput.value);
  })

  let chatForm = document.createElement("form");
  chatForm.id = "chatForm";
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput.value.length) {
      socket.emit("message", chatInput.value, room);
      console.log(chatInput.value);
      chatForm.reset();
    
    } else {
      console.log("cant send empty messages");
      
    }
  });

  let sendButton = document.createElement("button");
  sendButton.id = "sendButton";
  sendButton.innerHTML = "Send";

  main.append(chatList, chatForm);
  chatForm.append(chatInput, sendButton);
}
