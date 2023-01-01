// script imports
import { getHeader } from "./layout/header";
import { getSidebar, getAddBtn } from "./layout/sidebar";
import { getMain, displayProject } from "./layout/main-content";
import { getFooter } from "./layout/footer";
import { createProject, getProjectLibrary } from "./projects";

// style imports
import "./css/styles.css";
import "./css/style-reset.css";

const content = document.querySelector(".content");

// append main layout elements to body content

content.append(getHeader(), getSidebar(), getMain(), getFooter());

// add project menu click event
getAddBtn().onclick = (e) => {
  e.stopPropagation();
  addProjectMenu.displayProjectAddMenu();
};

function createNewProject(name, description) {
  createProject(name, description);

  // If there is only one project, select it by default
  if (getProjectLibrary().size() === 1) {
    const projectListItems = document.querySelectorAll(".project-list-item");
    // select the first project
    selectProject(projectListItems[0]);
  }
}

function selectProject(projectListItem) {
  projectListItem.classList.add("selected-project");
  const projectId = projectListItem.getAttribute("data-project-id");
  const project = getProjectLibrary().getProject(projectId);
  displayProject(project);
}

const addProjectMenu = (() => {
  function displayProjectAddMenu() {
    const projectAddMenu = document.createElement("div");
    projectAddMenu.classList.add("project-add-menu");

    const projectAddMenuTitle = document.createElement("p");
    projectAddMenuTitle.textContent = "New Project";

    const projectAddMenuCloseBtn = document.createElement("ion-icon");
    projectAddMenuCloseBtn.setAttribute("name", "close-outline");
    projectAddMenuCloseBtn.classList.add("project-add-menu-close-btn");
    projectAddMenuCloseBtn.onclick = () => {
      projectAddMenu.remove();
      toggleContentDisable();
    };

    const projectName = document.createElement("input");
    projectName.setAttribute("type", "text");
    projectName.setAttribute("placeholder", "Project Name");
    projectName.classList.add("project-name");

    const projectDescription = document.createElement("input");
    projectDescription.setAttribute("type", "text");
    projectDescription.setAttribute("placeholder", "Project Description");
    projectDescription.classList.add("project-description");

    const projectAddButton = document.createElement("button");
    projectAddButton.textContent = "Add";
    projectAddButton.classList.add("project-add-button");
    const errorLog = document.createElement("span");
    projectAddButton.append(errorLog);
    projectAddButton.onclick = () => {
      // validate input
      if (!validate(projectName)) {
        errorLog.textContent = "Project name is required";
        return;
      }
      // create and add project to library
      createNewProject(projectName.value, projectDescription.value);
      projectAddMenu.remove();
      toggleContentDisable();
    };

    projectAddMenu.append(
      projectAddMenuTitle,
      projectName,
      projectDescription,
      projectAddButton,
      projectAddMenuCloseBtn
    );

    content.append(projectAddMenu);

    toggleContentDisable();
  }

  function validate(input) {
    // validate input
    return input.value.length > 0 && input.validity.valid;
  }

  return { displayProjectAddMenu };
})();

function toggleContentDisable() {
  document
    .querySelectorAll(".content > :nth-child(n):not(.project-add-menu)")
    .forEach((element) => {
      element.classList.toggle("disabled");
    });
}

content.addEventListener("click", (e) => {
  // remove project add menu if clicked outside of it
  if (
    !!!document.querySelector(".project-add-menu") ||
    document.querySelector(".project-add-menu").contains(e.target)
  ) {
    return;
  }
  document.querySelector(".project-add-menu").remove();
  toggleContentDisable();
});
