import { getProjectLibrary, projectLibrary } from "../projects";
import { validate, toggleContentDisable } from "../intermediary";

const main = document.createElement("main");
main.classList.add("main");

// content
const projectTitle = document.createElement("div");
projectTitle.classList.add("project-title");

const projectInfo = document.createElement("div");
projectInfo.classList.add("project-info");
const projectInfoTitle = document.createElement("div");
projectInfoTitle.textContent = "Project Description:";
projectInfo.append(projectInfoTitle);

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
export const addNewTaskBtn = document.createElement("ion-icon");
addNewTaskBtn.setAttribute("name", "add-circle-outline");
addNewTaskBtn.classList.add("add-new-task-btn");

taskAreaHeader.append(taskAreaTitle, addNewTaskBtn);

// task area content

let currentProjectId = null; // current project id

export function getMain() {
  return main;
}

export function displayProject(projectId) {
  clearMain();
  const project = getProjectLibrary().getProject(projectId);
  if (!!!project) return;
  currentProjectId = project.id;

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
    toggleContentDisable();
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

  const projectDescription = document.createElement("p");
  projectDescription.classList.add("project-description");
  projectDescription.textContent =
    project.description === "" ? "No description" : project.description;

  projectInfo.append(projectInfoTitle, projectDescription);

  displayTasks();

  main.append(projectTitle, projectInfo, taskArea);
}

function displayTasks() {
  const tasks = getProjectLibrary().getProjectTasks(currentProjectId);
  taskAreaContent.innerHTML = "";
  if (Object.keys(tasks).length === 0) {
    const noTasks = document.createElement("p");
    noTasks.textContent = "No tasks";
    taskAreaContent.append(noTasks);
  } else {
    for (const taskId in Object.values(tasks)) {
      console.log(tasks[taskId]);
      let name, description, dueDate, priority;
      ({ name, dueDate, priority } = tasks[taskId]);
      const task = document.createElement("div");
      task.classList.add("task");
      const taskStatus = document.createElement("div");
      taskStatus.classList.add("task-status");
      taskStatus.setAttribute("data-status", "incomplete");
      taskStatus.onclick = () => {
        taskStatus.setAttribute(
          "data-status",
          taskStatus.getAttribute("data-status") === "incomplete"
            ? "complete"
            : "incomplete"
        );

        // update task status
        getProjectLibrary()
          .getProject(currentProjectId)
          .getTask(taskId)
          .toggleStatus();
      };
      const taskInfo = document.createElement("div");
      taskInfo.classList.add("task-info");
      taskInfo.textContent = !!!name ? "No Name" : name;
      const taskDueDate = document.createElement("div");
      taskDueDate.classList.add("task-due-date");
      taskDueDate.textContent = !!!dueDate ? "No due date" : dueDate;
      const taskPriority = document.createElement("div");
      taskPriority.classList.add("task-priority");
      taskPriority.setAttribute("data-priority", priority);
      const taskEditIcon = document.createElement("ion-icon");
      taskEditIcon.setAttribute("name", "create-outline");
      taskEditIcon.onclick = (e) => {
        showEditMenu("task", taskId);
        toggleContentDisable();
        e.stopPropagation();
      };
      task.append(
        taskStatus,
        taskInfo,
        taskDueDate,
        taskPriority,
        taskEditIcon
      );
      taskAreaContent.append(task);
    }
  }
  // clear task area and re-append
  taskArea.innerHTML = "";
  taskArea.append(taskAreaHeader, taskAreaContent);
}

function sortTasks(filter) {}

export function addNewTask(name, description, dueDate, priority) {
  getProjectLibrary()
    .getProject(currentProjectId)
    .addTask(name, description, dueDate, priority);
  // update task area
  displayTasks();
}

export function clearMain() {
  main.innerHTML = "";
  projectTitle.innerHTML = "";
  projectInfo.innerHTML = "";
  taskArea.innerHTML = "";
}

function showEditMenu(type, taskId) {
  type = type.toLowerCase();
  if (!(type === "project" || type === "task")) return;
  // convert to title case
  type = type[0].toUpperCase() + type.slice(1);

  const project = getProjectLibrary().getProject(currentProjectId);
  const task = !!taskId ? project.getTask(taskId) : null;

  const editMenu = document.createElement("div");
  editMenu.classList.add("edit-menu");

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
    markAllDoneBtn.setAttribute("checked", "true");
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
    toggleContentDisable();
  };

  saveBtn.onclick = () => {
    if (type === "Project") {
      // Validation
      if (!validate(name)) {
        return;
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
    toggleContentDisable();
  };

  editMenu.append(editMenuTitle, editMenuContent, editMenuCloseBtn, saveBtn);

  document.querySelector(".content").append(editMenu);
}
