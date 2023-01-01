import { addProjectListItem } from "./layout/sidebar";

const project = (name, id, description) => {
  const tasks = [];

  function addTask(task) {
    tasks.push(task);
  }

  function getTasks() {
    return tasks;
  }

  function info() {
    return description;
  }

  return { name, id, getTasks, addTask, info };
};

const task = (name, id, description, dueDate, priority) => {
  function info() {
    return description;
  }

  return { name, id, info, dueDate, priority };
};

let idCounter = 0;

const projectLibrary = (() => {
  const projects = {};
  const addProject = function (project) {
    projects[project.id] = project;
  };
  const getProject = function (id) {
    return projects[id] ?? null;
  };
  const removeProject = function (id) {
    delete projects[id];
  };
  const getProjects = function () {
    return projects;
  };
  const size = function () {
    return Object.keys(projects).length;
  };

  return {
    addProject,
    getProject,
    removeProject,
    getProjects,
    size,
  };
})();

// creates a new project and adds the project list item to the sidebar
export function createProject(name, description = "") {
  const newProject = project(name, idCounter, description);
  // add project to library
  projectLibrary.addProject(newProject);

  addProjectListItem(idCounter++, name);
}

export function getProjectLibrary() {
  return projectLibrary;
}
