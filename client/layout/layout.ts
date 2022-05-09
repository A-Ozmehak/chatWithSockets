import "./layout.css";

//Function for the footer
export default function layout() {
  let footer = document.createElement('footer');
  let creatorNames = document.createElement('p');
  creatorNames.innerHTML = "Elin Arntén, Jannie Bäckman Kuurne, Ella Larsson, Anna Özmehak"
  creatorNames.id = "namesFooter";

  footer.append(creatorNames)
  document.body.append(footer);
}

