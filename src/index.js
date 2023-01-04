// script imports
import { getHeader } from "./layout/header";
import { getSidebar, getAddBtn, addProjectListItem } from "./layout/sidebar";
import {
  getMain,
  displayProject,
  addNewTask,
  addNewTaskBtn,
} from "./layout/main-content";
import { getFooter } from "./layout/footer";
import { createProject, projectLibrary } from "./projects";
import { validate, toggleVeil } from "./intermediary";

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

// add task menu click event
addNewTaskBtn.onclick = (e) => {
  e.stopPropagation();
  addTaskMenu.displayTaskAddMenu();
};

const addProjectMenu = (() => {
  function displayProjectAddMenu() {
    const projectAddMenu = document.createElement("div");
    projectAddMenu.classList.add("project-add-menu", "popup");

    const projectAddMenuTitle = document.createElement("p");
    projectAddMenuTitle.textContent = "New Project";

    const projectAddMenuCloseBtn = document.createElement("ion-icon");
    projectAddMenuCloseBtn.setAttribute("name", "close-outline");
    projectAddMenuCloseBtn.classList.add("project-add-menu-close-btn");
    projectAddMenuCloseBtn.onclick = () => {
      projectAddMenu.remove();
      //toggleVeil();
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
      //toggleVeil();
    };

    projectAddMenu.append(
      projectAddMenuTitle,
      projectName,
      projectDescription,
      projectAddButton,
      projectAddMenuCloseBtn
    );

    content.append(projectAddMenu);

    //toggleVeil();
  }

  function createNewProject(name, description) {
    const newProjectId = createProject(name, description);

    // todo add callback function to display project on main content
    addProjectListItem(newProjectId, name, () => {
      // display project on main content
      selectProject(newProjectId);
    });

    // If there is only one project, select it by default
    if (projectLibrary.size() === 1) {
      const projectListItems = document.querySelectorAll(".project-list-item");
      // execute the onclick event of the first project list item
      projectListItems[0].dispatchEvent(new Event("click"));
    }
  }

  function selectProject(projectId) {
    // projectListItem.classList.add("active");
    // const projectId = projectListItem.getAttribute("data-project-id");
    // const project = getProjectLibrary().getProject(projectId);
    displayProject(projectId);
  }

  return { displayProjectAddMenu, createNewProject };
})();

const addTaskMenu = (() => {
  function displayTaskAddMenu() {
    const taskAddMenu = document.createElement("div");
    taskAddMenu.classList.add("task-add-menu", "popup");

    const taskAddMenuTitle = document.createElement("p");
    taskAddMenuTitle.textContent = "New Task";

    const taskAddMenuCloseBtn = document.createElement("ion-icon");
    taskAddMenuCloseBtn.setAttribute("name", "close-outline");
    taskAddMenuCloseBtn.classList.add("task-add-menu-close-btn");
    taskAddMenuCloseBtn.onclick = () => {
      taskAddMenu.remove();
      //toggleVeil();
    };

    const taskName = document.createElement("input");
    taskName.setAttribute("type", "text");
    taskName.setAttribute("placeholder", "Task Name");
    taskName.classList.add("add-task-name");

    const taskDescription = document.createElement("input");
    taskDescription.setAttribute("type", "text");
    taskDescription.setAttribute("placeholder", "Task Description");
    taskDescription.classList.add("add-task-description");

    const taskDueDate = document.createElement("input");
    taskDueDate.setAttribute("type", "date");
    taskDueDate.classList.add("select-task-due-date");

    const taskPriority = document.createElement("select");
    taskPriority.classList.add("select-task-priority");
    const taskPriorityOptions = [
      { value: "low", text: "Low" },
      { value: "medium", text: "Medium" },
      { value: "high", text: "High" },
    ];
    taskPriorityOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.value);
      optionElement.textContent = option.text;
      taskPriority.append(optionElement);
    });

    const taskAddButton = document.createElement("button");
    taskAddButton.textContent = "Add";
    taskAddButton.classList.add("task-add-button");
    const errorLog = document.createElement("span");
    taskAddButton.append(errorLog);
    taskAddButton.onclick = () => {
      // validate input
      if (!validate(taskName, taskDueDate, taskPriority)) {
        errorLog.textContent = "Please fill out all fields";
        return;
      }
      // create and add task to library
      addNewTask(
        taskName.value,
        taskDescription.value,
        taskDueDate.value,
        taskPriority.value
      );
      taskAddMenu.remove();
      //toggleVeil();
    };

    taskAddMenu.append(
      taskAddMenuTitle,
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskAddButton,
      taskAddMenuCloseBtn
    );

    content.append(taskAddMenu);

    //toggleVeil();
  }
  return { displayTaskAddMenu };
})();

window.onload = () => {
  // create default project
  addProjectMenu.createNewProject(
    "Default Project",
    "Default Project Description"
  );
  addNewTask("Task 1", "Default Task Description", "2021-01-01", "low");
  addNewTask("Task 2", "Default Task Description", "2021-01-01", "medium");
  addNewTask("Task 3", "Default Task Description", "2021-01-01", "high");
};
