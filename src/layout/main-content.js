import { projectLibrary } from "../projects";
import { projectEntryForm, addProjectListItem } from "./sidebar";
import { getPopupMenu } from "./popup-menu";
import { fetchFromLocalStorage } from "../storage";

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

const clearAllBtn = document.createElement("button");
clearAllBtn.classList.add("clear-all-btn");
clearAllBtn.innerHTML = "clear";
clearAllBtn.onclick = () => {
  projectLibrary.clearAllProjectTasks(currentProjectId);
  displayTasks();
};

const addNewTaskBtn = document.createElement("button");
addNewTaskBtn.innerHTML =
  "new <ion-icon  name='add-circle-outline'></ion-icon>";
addNewTaskBtn.classList.add("add-new-task-btn");
addNewTaskBtn.onclick = (e) => {
  e.stopPropagation();
  const taskMenu = getPopupMenu("add");
  if (!!!taskMenu) alert("We have a problem in our code");

  // set a callback function for the submit button
  taskMenu.setSubmitEvent(
    function () {
      addNewTask(
        this.taskName.value,
        this.taskDescription.value,
        this.taskDueDate.value,
        this.taskPriority.value
      );
    }
      // bind the callback function to the taskMenu object
      .bind(taskMenu)
  );
  taskMenu.showMenu();
};

const filterBtn = document.createElement("ion-icon");
filterBtn.setAttribute("name", "filter-circle-outline");
filterBtn.classList.add("filter-btn");
filterBtn.onclick = (e) => {};

taskAreaHeader.append(addNewTaskBtn, filterBtn, clearAllBtn);

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
    // display top project
    const topProjectListItem = document.querySelector(".project-list-item");
    if (topProjectListItem) {
      topProjectListItem.click();
    } else {
      clearMain();
    }
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

export function addNewTask(name, description, dueDate, priority, isDone) {
  projectLibrary.addProjectTask(
    currentProjectId,
    name,
    description,
    dueDate,
    priority,
    isDone
  );
  // update task area
  displayTasks();
}

export function clearMain() {
  main.innerHTML = "";
  projectTitle.innerHTML = "";
  taskArea.innerHTML = "";
}

function showEditMenu(category, taskId) {
  // fail safe
  if (!(category === "project" || category === "task")) return;

  switch (category) {
    case "project":
      const project = projectLibrary.getProject(currentProjectId);
      const projectMenu = getPopupMenu("edit", "project");
      projectMenu.setDisplayText(project.name);
      projectMenu.setSubmitEvent(
        function () {
          // check if mark all tasks as complete is checked
          if (this.markAsComplete.getAttribute("checked") === "true")
            projectLibrary.markAllTasksDone(project.id);
          projectLibrary.updateProject(project.id, this.nameInput.value);

          // update display
          displayProject(currentProjectId);
        }.bind(projectMenu)
      );
      projectMenu.showMenu();
      break;
    case "task":
      const task = projectLibrary.getProject(currentProjectId).getTask(taskId);
      const taskMenu = getPopupMenu("edit", "task");
      taskMenu.setDisplayText(
        task.name,
        task.description,
        task.dueDate,
        task.priority,
        task.isComplete()
      );
      taskMenu.setSubmitEvent(
        function () {
          projectLibrary.updateProjectTask(
            currentProjectId,
            taskId,
            this.nameInput.value,
            this.descriptionInput.value,
            this.dueDateInput.value,
            this.priorityInput.value,
            this.markAsComplete.getAttribute("checked") === "true"
          );

          // update display
          displayProject(currentProjectId);
        }.bind(taskMenu)
      );
      taskMenu.showMenu();
      break;
  }
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

function createNewProject(name, wasLoaded = false) {
  const newProjectId = projectLibrary.addNewProject(name);

  // add project to project list with a call back function to display the project when clicked
  addProjectListItem(newProjectId, name, function () {
    // display project on main content
    displayProject(newProjectId);
  });

  const projectListItems = document.querySelectorAll(".project-list-item");
  // if page was loaded selected the first list item as the default project
  if (wasLoaded) {
    // only execute the onclick event of the first project
    projectListItems[0].click();
    return;
  }
  // execute the onclick event of the recently added project
  projectListItems[projectListItems.length - 1].click();
  projectListItems[projectListItems.length - 1].scrollIntoView();
}

window.onload = () => {
  const storage = fetchFromLocalStorage("projects");
  /* 
    Format: 
    {
        project_id: "project": project_object, "tasks": {task_id: task_object, ...},
    }

    Format of the project object is as:
    project: {name: "Project Name", id: "project id"}

    the task object is as:
    tasks: {
        task_id: {name: "task name", description: "task description", dueDate: "due date", priority: "priority", done: false/true},
    */

  // create default project if there is no project in storage
  if (!!!storage || Object.entries(storage).length === 0) {
    createNewProject("Default Project", true);
    addNewTask(
      "Task 1",
      "Default Task Description",
      new Date().toISOString().slice(0, 10),
      "low"
    );
    addNewTask(
      "Task 2",
      "Default Task Description",
      new Date().toISOString().slice(0, 10),
      "medium"
    );
    addNewTask(
      "Task 3",
      "Default Task Description",
      new Date().toISOString().slice(0, 10),
      "high"
    );
  } else {
    const storageKeys = Object.keys(storage);
    // load projects from storage
    for (const projectId of storageKeys) {
      const project = storage[projectId]["project"];
      const tasks = storage[projectId]["tasks"];
      createNewProject(project.name, true); // the currentprojectID is being set
      const taskKeys = Object.keys(tasks);
      // add tasks to project
      for (const taskId of taskKeys) {
        const task = tasks[taskId];
        addNewTask(
          task.name,
          task.description,
          task.dueDate,
          task.priority,
          task.done
        );
      }
    }
  }
};
