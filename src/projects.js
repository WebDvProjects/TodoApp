const project = (name, id, tasks = {}) => {
  var tasks = tasks;
  /* Initial starting id will be -1 + 1 = 0 
   ...[] returns -Infinity so -1 will always be greater
   Otheriwse if the project is being updated/assigned with a list of tasks
   then increment the last id element by 1 */
  let taskId = Math.max(-1, ...Object.keys(tasks)) + 1;
  let projectName = name;

  // add/update task
  function addTask(name, description, dueDate, priority, task_id = taskId++) {
    tasks[task_id] = task(taskId, name, description, dueDate, priority);
    return task_id;
  }

  function copyTasks(taskList) {
    tasks = taskList;
  }

  function toggleTaskStatus(taskId) {
    tasks[taskId].toggleStatus(true);
  }

  function getTask(taskID) {
    return tasks[taskID];
  }

  function removeTask(id) {
    delete tasks[id];
  }

  function clearAllTasks() {
    tasks = {};
    taskId = 0;
  }

  function getTasks() {
    return tasks;
  }

  // returns true if all tasks are complete
  function status() {
    const tasksKeys = Object.keys(tasks);
    const completed = tasksKeys.reduce(
      (state, task) => state && task.isComplete(),
      true
    );
    return completed ? "done" : "incomplete";
  }

  const markAllTasksDone = function () {
    for (const task of Object.values(tasks)) {
      task.toggleStatus(true);
    }
  };

  return {
    name: projectName,
    id,
    getTasks,
    addTask,
    removeTask,
    status,
    getTask,
    toggleTaskStatus,
    clearAllTasks,
    markAllTasksDone,
  };
};

const task = (id, name, description, dueDate, priority, status = false) => {
  let completed = status;
  function info() {
    return description;
  }

  function toggleStatus(done) {
    completed = done ?? !completed;
  }

  function isComplete() {
    return completed;
  }

  return { name, description, dueDate, priority, isComplete, toggleStatus };
};

let idCounter = 0;

export const projectLibrary = (() => {
  const projects = {};
  // todo: change to updateProject
  const addProject = function (project) {
    projects[project.id] = project;
  };
  const addNewProject = (name) => {
    const newProject = project(name, idCounter++);
    addProject(newProject);
    return newProject.id;
  };
  const getProject = function (id) {
    return projects[id] ?? null;
  };

  const updateProject = function (id, name) {
    projects[id] = project(name, id, projects[id].getTasks());
  };

  const updateProjectTask = function (
    projectId,
    taskId,
    name,
    description,
    dueDate,
    priority,
    status
  ) {
    projects[[projectId]].add(name, description, dueDate, priority, taskId);
  };

  const toggleTaskStatus = function (projectId, taskId) {
    projects[projectId].toggleTaskStatus(taskId);
  };

  const deleteProject = function (id) {
    delete projects[id];
  };

  // creats a new project task and returns the task id
  const addProjectTask = function (projectId, ...taskDetails) {
    return projects[projectId].addTask(...taskDetails);
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

  const removeTask = function (projectId, taskId) {
    projects[projectId].removeTask(taskId);
  };

  const clearAllProjectTasks = function (projectId) {
    projects[projectId].clearAllTasks();
  };

  const markAllTasksDone = function (projectId) {
    projects[projectId].markAllTasksDone();
  };

  const getProjects = function () {
    return projects;
  };
  const size = function () {
    return Object.keys(projects).length;
  };

  return {
    addProject,
    addNewProject,
    getProject,
    removeProject,
    getProjects,
    size,
    addProjectTask,
    getProjectTasks,
    removeProjectTask,
    updateProject,
    deleteProject,
    updateProjectTask,
    toggleTaskStatus,
    removeTask,
    clearAllProjectTasks,
    markAllTasksDone,
  };
})();

// creates a new project and adds the project list item to the sidebar
// export function createProject(name, description = "") {
//   const newProject = project(name, idCounter, description);
//   // add project to library
//   projectLibrary.addProject(newProject);

//   return idCounter++;
// }

// export function getProjectLibrary() {
//   return projectLibrary;
// }
