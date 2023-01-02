const project = (name, id, description, tasks = {}) => {
  var tasks = tasks;
  let taskId = 0;
  let projectName = name;
  let projectDescription = description;

  function addTask(name, description, dueDate, priority) {
    tasks[taskId] = task(taskId, name, description, dueDate, priority);
    return taskId++;
  }

  // function update(name, description) {
  //   projectName = name;
  //   projectDescription = description;
  // }

  function getTask(taskID) {
    return tasks[taskID];
  }

  function removeTask(id) {
    delete tasks[id];
  }

  function getTasks() {
    return tasks;
  }

  function status() {
    const tasksKeys = Object.keys(tasks);
    const completed = tasksKeys.reduce(
      (state, task) => state && task.isComplete(),
      true
    );
    return completed ? "done" : "incomplete";
  }

  return {
    name: projectName,
    id,
    description: projectDescription,
    getTasks,
    addTask,
    removeTask,
    status,
    getTask,
    // update,
  };
};

const task = (id, name, description, dueDate, priority, status = false) => {
  let completed = status;
  function info() {
    return description;
  }

  function toggleStatus() {
    completed = !completed;
  }

  function isComplete() {
    return completed;
  }

  return { name, description, dueDate, priority, isComplete, toggleStatus };
};

let idCounter = 0;

export const projectLibrary = (() => {
  const projects = {};
  const addProject = function (project) {
    projects[project.id] = project;
  };
  const getProject = function (id) {
    return projects[id] ?? null;
  };

  const updateProject = function (id, name, description, tasks) {
    console.log("before", projects[id]);
    projects[id] = project(name, id, description, projects[id].getTasks());
    console.log("after", projects[id]);
  };

  const deleteProject = function (id) {
    delete projects[id];
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
    updateProject,
    deleteProject,
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
