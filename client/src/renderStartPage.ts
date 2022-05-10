import { IOSocket } from "./main";
import footer from "../layout/footer";
import "./style.css";
import "./room.css";
import "../layout/layout.css";

export function renderStartPage(socket: IOSocket) {
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
  footer(); // TODO rename to footer
}
