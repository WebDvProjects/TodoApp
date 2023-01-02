import { getProjectLibrary } from "../projects";

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

export function displayProject(project) {
  clearMain();
  currentProjectId = project.id;

  const projectTitlePrefix = document.createElement("span");
  projectTitlePrefix.textContent = "Project: ";
  projectTitlePrefix.classList.add("project-title-prefix");
  const projectName = document.createElement("span");
  projectName.classList.add("project-name");
  projectName.textContent = project.name;
  const projectEditIcon = document.createElement("ion-icon");
  projectEditIcon.setAttribute("name", "create-outline");
  projectTitle.append(projectTitlePrefix, projectName, projectEditIcon);

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

function showEditMenu(type) {
  switch (type) {
    case "project":
      showProjectEditMenu();
      break;
    case "task":
      showTaskEditMenu();
      break;
  }
}

function showProjectEditMenu() {}
function showTaskEditMenu() {}
