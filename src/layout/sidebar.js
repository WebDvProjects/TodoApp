const sideBar = document.createElement("div");

sideBar.classList.add("side-bar");
// side bar title area
const sideBarTitleArea = document.createElement("div");
sideBarTitleArea.classList.add("side-bar-title-area");
// title
const sideBarTitle = document.createElement("span");
sideBarTitle.textContent = "PROJECTS";
// add icon
const addIcon = document.createElement("ion-icon");
addIcon.setAttribute("name", "add-outline");
// addIcon.onclick = displayProjectAddMenu;

sideBarTitleArea.append(sideBarTitle, addIcon);

// projects list
const projectsList = document.createElement("ul");
// sample project list items todo - remove after testing

sideBar.append(sideBarTitleArea, projectsList);

export function getSidebar() {
  return sideBar;
}

export function getAddBtn() {
  return addIcon;
}

// add project as a list item
export function addProjectListItem(id, name) {
  const projectListItem = document.createElement("li");
  projectListItem.classList.add("project-list-item");
  projectListItem.setAttribute("data-project-id", id);
  projectListItem.textContent = name;
  projectsList.append(projectListItem);
}
