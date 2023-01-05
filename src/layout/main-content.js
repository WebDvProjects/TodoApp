import { projectLibrary } from "../projects";
import { validate, toggleVeil } from "../intermediary";
import { projectEntryForm, addProjectListItem } from "./sidebar";

const main = document.createElement("main");
main.classList.add("main");

// content
const projectTitle = document.createElement("div");
projectTitle.classList.add("project-title");

// task area
const taskArea = document.createElement("div");
taskArea.classList.add("task-area");
const taskAreaHeader = document.createElement("div");
taskAreaHeader.classList.add("task-area-header");
const taskAreaContent = document.createElement("div");
taskAreaContent.classList.add("task-area-content");

// task area header
const taskAreaTitle = document.createElement("div");
taskAreaTitle.textContent = "Tasks:";

const clearAllBtn = document.createElement("button");
clearAllBtn.classList.add("clear-all-btn");
clearAllBtn.textContent = "Clear All";
clearAllBtn.onclick = () => {
  projectLibrary.clearAllProjectTasks(currentProjectId);
  displayTasks();
};

export const addNewTaskBtn = document.createElement("ion-icon");
addNewTaskBtn.setAttribute("name", "add-circle-outline");
addNewTaskBtn.classList.add("add-new-task-btn");

taskAreaHeader.append(taskAreaTitle, clearAllBtn, addNewTaskBtn);

// task area content
const taskContentWrapper = document.createElement("div");
taskContentWrapper.classList.add("task-content-wrapper");
taskAreaContent.append(taskContentWrapper);

let currentProjectId = null; // current project id

export function getMain() {
  return main;
}

export function displayProject(projectId) {
  clearMain();
  const project = projectLibrary.getProject(projectId);
  if (!!!project) return;
  currentProjectId = project.id;
  // update project name in sidebar list
  document.querySelector(`[data-project-id="${project.id}"]`).textContent =
    project.name;

  const projectTitlePrefix = document.createElement("span");
  projectTitlePrefix.textContent = "Project: ";
  projectTitlePrefix.classList.add("project-title-prefix");
  const projectName = document.createElement("span");
  projectName.classList.add("project-name");
  projectName.textContent = project.name;
  const projectEditIcon = document.createElement("ion-icon");
  projectEditIcon.setAttribute("name", "create-outline");
  projectEditIcon.onclick = (e) => {
    showEditMenu("project");
    // toggleVeil();
    e.stopPropagation();
  };
  const deleteProjectIcon = document.createElement("ion-icon");
  deleteProjectIcon.setAttribute("name", "trash-outline");
  deleteProjectIcon.onclick = (e) => {
    projectLibrary.deleteProject(projectId);
    document.querySelector(`[data-project-id="${projectId}"]`).remove();
    clearMain();
    // todo - display default project
    e.stopPropagation();
  };
  projectTitle.append(
    projectTitlePrefix,
    projectName,
    projectEditIcon,
    projectEditIcon,
    deleteProjectIcon
  );

  displayTasks();

  main.append(projectTitle, taskArea);
}

function displayTasks() {
  const tasks = projectLibrary.getProjectTasks(currentProjectId);

  taskContentWrapper.innerHTML = "";
  if (Object.keys(tasks).length === 0) {
    const noTasks = document.createElement("p");
    noTasks.textContent = "No tasks";
    taskContentWrapper.append(noTasks);
  } else {
    for (const taskId of Object.keys(tasks)) {
      const task = tasks[taskId];
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      const taskStatus = document.createElement("div");
      taskStatus.classList.add("task-status");
      taskStatus.setAttribute(
        "data-status",
        task.isComplete() ? "complete" : "incomplete"
      );
      taskStatus.onclick = () => {
        taskStatus.setAttribute(
          "data-status",
          taskStatus.getAttribute("data-status") === "incomplete"
            ? "complete"
            : "incomplete"
        );

        // update task status
        projectLibrary.toggleTaskStatus(currentProjectId, taskId);
      };
      const taskInfo = document.createElement("div");
      taskInfo.classList.add("task-info");
      taskInfo.textContent = !!!task.name ? "No Name" : task.name;
      const taskDueDate = document.createElement("div");
      taskDueDate.classList.add("task-due-date");
      taskDueDate.textContent = !!!task.dueDate ? "No due date" : task.dueDate;
      const taskPriority = document.createElement("div");
      taskPriority.classList.add("task-priority");
      taskPriority.setAttribute("data-priority", task.priority);
      const taskEditIcon = document.createElement("ion-icon");
      taskEditIcon.setAttribute("name", "create-outline");
      taskEditIcon.onclick = (e) => {
        showEditMenu("task", taskId);
        // toggleVeil();
        e.stopPropagation();
      };
      const taskDeleteIcon = document.createElement("ion-icon");
      taskDeleteIcon.setAttribute("name", "trash-outline");
      taskDeleteIcon.onclick = (e) => {
        projectLibrary.removeProjectTask(currentProjectId, taskId);
        displayTasks();
        e.stopPropagation();
      };

      taskElement.append(
        taskStatus,
        taskInfo,
        taskDueDate,
        taskPriority,
        taskEditIcon,
        taskDeleteIcon
      );

      taskContentWrapper.append(taskElement);
    }
  }
  // clear task area and re-append
  taskArea.innerHTML = "";
  taskArea.append(taskAreaHeader, taskAreaContent);
}

function sortTasks(filter) {}

export function addNewTask(name, description, dueDate, priority) {
  projectLibrary.addProjectTask(
    currentProjectId,
    name,
    description,
    dueDate,
    priority
  );
  // update task area
  displayTasks();
}

export function clearMain() {
  main.innerHTML = "";
  projectTitle.innerHTML = "";
  taskArea.innerHTML = "";
}

function showEditMenu(type, taskId) {
  document.querySelector(".popup")?.remove();

  type = type.toLowerCase();
  if (!(type === "project" || type === "task")) return;
  // convert to title case
  type = type[0].toUpperCase() + type.slice(1);

  const project = projectLibrary.getProject(currentProjectId);
  const task = !!taskId ? project.getTask(taskId) : null;

  const editMenu = document.createElement("div");
  editMenu.classList.add("edit-menu", "popup");

  const editMenuTitle = document.createElement("div");
  editMenuTitle.classList.add("edit-menu-title");
  editMenuTitle.textContent = `Edit ${type}`;

  const editMenuContent = document.createElement("div");
  editMenuContent.classList.add("edit-menu-content");

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "edit-menu-name");
  nameLabel.textContent = `${type} name`;
  const name = document.createElement("input");
  name.setAttribute("type", "text");
  name.id = "edit-menu-name";
  name.required = true;
  name.setAttribute("placeholder", `${type} name`);
  nameLabel.append(name);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "edit-menu-description");
  descriptionLabel.textContent = `${type} description`;
  const description = document.createElement("textarea");
  description.setAttribute("placeholder", `${type} description`);
  description.id = "edit-menu-description";
  descriptionLabel.append(description);

  editMenuContent.append(nameLabel, descriptionLabel);

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save-btn");
  saveBtn.textContent = "Save";

  if (type === "Project") {
    name.value = project.name;
    description.textContent = project.description;

    const markAllDone = document.createElement("div");
    markAllDone.classList.add("mark-all-done");
    const markText = document.createElement("p");
    markText.textContent = "Mark all tasks as done";
    const markAllDoneBtn = document.createElement("div");
    markAllDoneBtn.classList.add("mark-all-done-btn");
    markAllDoneBtn.setAttribute("checked", "false");
    markAllDoneBtn.onclick = () => {
      markAllDoneBtn.setAttribute(
        "checked",
        markAllDoneBtn.getAttribute("checked") === "true" ? "false" : "true"
      );
    };

    markAllDone.append(markText, markAllDoneBtn);

    editMenuContent.append(markAllDone);
  } else if (type === "Task" && !!task) {
    name.value = task.name;
    description.textContent = task.description;
  }

  const editMenuCloseBtn = document.createElement("ion-icon");
  editMenuCloseBtn.setAttribute("name", "close-outline");
  editMenuCloseBtn.classList.add("edit-menu-close-btn");
  editMenuCloseBtn.onclick = () => {
    editMenu.remove();
    // toggleVeil();
  };

  saveBtn.onclick = () => {
    // General Validation
    if (!validate(name)) {
      return;
    }

    if (type === "Project") {
      // check if mark all done is checked
      if (
        document.querySelector(".mark-all-done-btn").getAttribute("checked") ===
        "true"
      ) {
        projectLibrary.markAllTasksDone(currentProjectId);
      }
      // update project in the library
      projectLibrary.updateProject(
        currentProjectId,
        name.value,
        description.value
      );
      // update project display
      displayProject(currentProjectId);
    } else if (type === "Task") {
      // update task in the library

      // update task area
      displayTasks();
    }
    editMenu.remove();
    // toggleVeil();
  };

  editMenu.append(editMenuTitle, editMenuContent, editMenuCloseBtn, saveBtn);

  document.querySelector(".content").append(editMenu);
}

projectEntryForm.onsubmit = handleSubmitEvent;

function handleSubmitEvent(e) {
  e.preventDefault();
  const projectNameInput = document.querySelector("input.project-name-input");
  if (!!projectNameInput.value) {
    createNewProject(projectNameInput.value);
    projectNameInput.value = "";
  }
}

function createNewProject(name) {
  const newProjectId = projectLibrary.addNewProject(name);
  currentProjectId = newProjectId;

  // add project to project list
  addProjectListItem(newProjectId, name, function () {
    // display project on main content
    displayProject(newProjectId);
  });

  // if there is only one project, display it
  if (
    !!!document.querySelector(".project-list-item.active") &&
    projectLibrary.size() === 1
  ) {
    const projectListItems = document.querySelectorAll(".project-list-item");
    // execute the onclick event of the first project list item
    projectListItems[0].dispatchEvent(new Event("click"));
  }
}

window.onload = () => {
  // create default project
  createNewProject("Default Project");
  addNewTask("Task 1", "Default Task Description", "2021-01-01", "low");
  addNewTask("Task 2", "Default Task Description", "2021-01-01", "medium");
  addNewTask("Task 3", "Default Task Description", "2021-01-01", "high");
};
