import { IOSocket } from "./main";
import { renderRoomsList } from "./renderRoomsList";
import "./chat.css";

let joinedRoom: string;

export function renderMessageForm(socket: IOSocket) {
  document.body.innerHTML = "";
  renderRoomsList();

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
