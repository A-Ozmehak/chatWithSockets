import "./layout.css";
import { createRoom } from "../src/createRoom";
import { IOSocket } from "../src/main";

export function aside(socket: IOSocket) {
  let aside = document.createElement("aside");
  aside.id = "aside";

  let rheader = document.createElement("div");
  rheader.id = "rheader";

  document.body.append(aside, rheader);
}
