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
addIcon.id = "add-project-btn";
addIcon.setAttribute("name", "remove-outline");

export const projectEntryForm = document.createElement("form");
projectEntryForm.classList.add("project-entry-form");
const newProjectEntry = document.createElement("div");
newProjectEntry.classList.add("project-entry");
const addProjectInput = document.createElement("input");
addProjectInput.setAttribute("type", "text");
addProjectInput.setAttribute("placeholder", "New project");
addProjectInput.classList.add("project-name-input");
const enterBtn = document.createElement("ion-icon");
enterBtn.setAttribute("name", "enter-outline");
// if enter/submit btn is clicked
enterBtn.onclick = () => {
  projectEntryForm.submit();
};

newProjectEntry.append(addProjectInput, enterBtn);
projectEntryForm.append(newProjectEntry);

// when add project button is clicked
addIcon.onclick = () => {
  // change the icon to minus icon
  if (addIcon.getAttribute("name") === "add-outline") {
    addIcon.setAttribute("name", "remove-outline");
  }
  // change the icon to add icon
  else {
    addIcon.setAttribute("name", "add-outline");
  }
};

sideBarTitleArea.append(sideBarTitle, addIcon);

// projects list
// const projectListWrapper = document.createElement("div");
// projectListWrapper.classList.add("project-list-wrapper");
const projectsList = document.createElement("ul");
projectsList.classList.add("projects-list");

sideBar.append(sideBarTitleArea, projectEntryForm, projectsList);

export function getSidebar() {
  return sideBar;
}

export function getAddBtn() {
  return addIcon;
}

// add project as a list item
export function addProjectListItem(id, name, callBack = null) {
  const projectListItem = document.createElement("li");
  projectListItem.classList.add("project-list-item");
  projectListItem.setAttribute("data-project-id", id);
  projectListItem.textContent = name;
  projectListItem.onclick = (e) => {
    e.stopPropagation();
    const projectListItems = document.querySelectorAll(".project-list-item");
    projectListItems.forEach((item) => {
      item.classList.remove("active");
    });
    projectListItem.classList.add("active");
    // if callback function is given
    if (callBack) {
      callBack();
    }
  };

  projectsList.append(projectListItem);
}
