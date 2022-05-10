// import  { aside } from "../layout/aside";

let savedRoomList: string[] = [];

export function renderRoomsList() {
  const parent = document.getElementById("aside");
  console.log("ska rendera om ul och li i aside");

  //Renders the list with all the rooms
  // function renderRoomsList() {
  // let aside = document.createElement("aside");
  // aside.id = "sideContainer";

  // let rheader = document.createElement("div");
  // rheader.id = "rheader";

  let roomInputHeader = document.createElement("h2");
  roomInputHeader.innerHTML = "Rooms";

  let listContent = document.createElement("ul");
  listContent.id = "listContent";

  savedRoomList.forEach((room) => {
    let listItem = document.createElement("li");
    listItem.innerText = room;
    // listOfRooms.addEventListener
    listContent.append(listItem);
  });

  // TODO: move away from renderRoomList
  // let leaveBtn = document.createElement("button");
  // leaveBtn.id = "leaveBtn";
  // leaveBtn.innerHTML = "Leave room";

  // leaveBtn.addEventListener("click", () => {
  //   socket.emit("leave");
  //   createRoom(socket);
  // });

  // aside.append(roomInputHeader, listContent,);
  // document.body.append(aside, rheader);
  parent?.append(roomInputHeader, listContent);
  document.body.append(roomInputHeader, listContent);
}
