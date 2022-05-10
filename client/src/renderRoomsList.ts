// import  { aside } from "../layout/aside";

let savedRoomList: string[] = [];

export function renderRoomsList() {
  const parent = document.getElementById("aside");
  console.log("ska rendera om ul och li i aside");

  let roomInputHeader = document.createElement("h2");
  roomInputHeader.innerHTML = "Rooms";

  let listContent = document.createElement("ul");
  listContent.id = "listContent";

  parent?.append(roomInputHeader, listContent);
  document.body.append(roomInputHeader, listContent);
}
