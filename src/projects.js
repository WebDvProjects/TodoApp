const project = (name, id, description) => {
  const tasks = {};
  let taskId = 0;

  function addTask(description, dueDate, priority) {
    tasks[taskId] = task(taskId, description, dueDate, priority);
    return taskId++;
  }

  function removeTask(id) {
    delete tasks[id];
  }

  function getTasks() {
    return tasks;
  }

  return { name, id, description, getTasks, addTask, removeTask };
};

const task = (id, description, dueDate, priority) => {
  function info() {
    return description;
  }

  return { description, dueDate, priority };
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

  // creats a new project task and returns the task id
  const addProjectTask = function (projectId, task) {
    return projects[projectId].addTask(task);
  };

  const getProjectTasks = function (projectId) {
    return projects[projectId].getTasks();
  };

  const removeProjectTask = function (projectId, taskId) {
    const project = projects[projectId];
    project.removeTask(taskId);
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
    addProjectTask,
    getProjectTasks,
    removeProjectTask,
  };
})();

// creates a new project and adds the project list item to the sidebar
export function createProject(name, description = "") {
  const newProject = project(name, idCounter, description);
  // add project to library
  projectLibrary.addProject(newProject);

  return idCounter++;
}

export function getProjectLibrary() {
  return projectLibrary;
}
