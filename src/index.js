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
import { validate, toggleVeil } from "./helper-functions";

// style imports
import "./css/styles.css";
import "./css/style-reset.css";

const content = document.querySelector(".content");

// append main layout elements to body content

content.append(getHeader(), getSidebar(), getMain(), getFooter());

// add task menu click event
addNewTaskBtn.onclick = (e) => {
  e.stopPropagation();
  addTaskMenu.displayTaskAddMenu();
};

const addTaskMenu = (() => {
  function displayTaskAddMenu() {
    document.querySelector(".popup")?.remove();
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
  }
  return { displayTaskAddMenu };
})();
