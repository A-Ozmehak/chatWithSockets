import { IOSocket } from "./main";
import footer from "../layout/footer";
import "./style.css";
import "./room.css";
import "../layout/layout.css";

export let savedNick: string;

export function renderStartPage(socket: IOSocket) {
  document.body.innerHTML = "";

  let startMainContainer = document.createElement("div");
  startMainContainer.id = "startMainContainer";

  let header = document.createElement("header");
  header.id = "header";

  let startContainer = document.createElement("div");
  startContainer.id = "startContainer";

  let container = document.createElement("div");
  container.id = "container";

  let inputContent = document.createElement("div");
  inputContent.id = "inputContent";

  let inputHeader = document.createElement("h2");
  inputHeader.innerHTML = "Enter your nickname";

  let nickNameInput = document.createElement("input");
  nickNameInput.id = "nickNameInput";

  let logInBtn = document.createElement("button");
  savedNick = nickNameInput.value;
  logInBtn.id = "logInButton";
  logInBtn.innerHTML = "Continue";

  logInBtn.addEventListener("click", () => {
    socket.auth = { nickname: nickNameInput.value };
    socket.connect();
    savedNick = nickNameInput.value;
    console.log(savedNick)
  });

  startMainContainer.append(header, startContainer);
  startContainer.append(container);
  container.append(inputContent, inputHeader, nickNameInput, logInBtn);
  document.body.append(startMainContainer);

  footer(); // TODO rename to footer
}
