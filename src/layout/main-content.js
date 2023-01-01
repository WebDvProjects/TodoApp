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
const addNewTaskBtn = document.createElement("ion-icon");
addNewTaskBtn.setAttribute("name", "add-circle-outline");
addNewTaskBtn.classList.add("add-new-task-btn");
addNewTaskBtn.addEventListener("click", () => {
  // open popul menu
  // not implemented

  // add new task
  addNewTask("No description", "No due date", "No priority");
});
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
  projectTitle.append(projectTitlePrefix, projectName);

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
      let description, dueDate, priority;
      ({ description, dueDate, priority } = tasks[taskId]);
      const task = document.createElement("div");
      task.classList.add("task");
      const taskInfo = document.createElement("div");
      taskInfo.classList.add("task-info");
      taskInfo.textContent =
        description === "" ? "No description" : description;
      const taskDueDate = document.createElement("div");
      taskDueDate.classList.add("task-due-date");
      taskDueDate.textContent = dueDate === "" ? "No due date" : dueDate;
      const taskPriority = document.createElement("div");
      taskPriority.classList.add("task-priority");
      taskPriority.textContent = priority === "" ? "No priority" : priority;
      task.append(taskInfo, taskDueDate, taskPriority);
      taskAreaContent.append(task);
    }
  }
  // clear task area and re-append
  taskArea.innerHTML = "";
  taskArea.append(taskAreaHeader, taskAreaContent);
}

function addNewTask(description, dueDate, priority) {
  getProjectLibrary()
    .getProject(currentProjectId)
    .addTask(description, dueDate, priority);
  // update task area
  displayTasks();
}

export function clearMain() {
  main.innerHTML = "";
  projectTitle.innerHTML = "";
  projectInfo.innerHTML = "";
  taskArea.innerHTML = "";
}
