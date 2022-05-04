import "./layout.css";

// class Layout {
//   public getNickname;
// }

function Layout() {
  const container = document.createElement("div");
  container.id = "container";
  let header = document.createElement("header");
  header.id = "header";
  let title = document.createElement("h1");
  title.innerHTML = "Chit & Chat";

  container.append(header, title);
  document.body.append(container);
}

// export default Layout;
