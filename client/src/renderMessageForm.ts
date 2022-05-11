import { IOSocket } from "./main";
import "./chat.css";

let joinedRoom: string;

export function renderMessageForm(main: HTMLElement, socket: IOSocket) {
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

  main.append(chatList, chatForm);
  chatForm.append(chatInput, sendButton);
}
