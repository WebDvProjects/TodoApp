// at the moment just focus on displaying project/task editing menu

const popup = document.createElement("div");
popup.classList.add("popup");

// returns a popup menu element
function showPopupMenu(type = "add", category = "project") {
  switch (type) {
    case "add":
      return showAddMenu();
    case "edit":
      switch (category) {
        case "project":
          return showProjectEditMenu();
        case "task":
          return showTaskEditMenu();
      }
      return showEditMenu(category);
    default:
      return null;
  }
}

// add new task menu
const showAddMenu = () => {};
