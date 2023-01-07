import { updateLocalStorage } from "./storage";

const project = (name, id, projectTasks = {}) => {
  let tasks = projectTasks;
  /* Initial starting id will be -1 + 1 = 0 
   ...[] returns -Infinity so -1 will always be greater
   Otheriwse if the project is being updated/assigned with a list of tasks
   then increment the last id element by 1 */
  let taskId = Math.max(-1, ...Object.keys(tasks)) + 1;
  let projectName = name;

  // add/update task
  function addTask(
    name,
    description,
    dueDate,
    priority,
    status = false,
    task_id = taskId++
  ) {
    tasks[task_id] = task(taskId, name, description, dueDate, priority, status);
    return task_id;
  }

  function updateTask(id, name, description, dueDate, priority, status) {
    tasks[id] = task(id, name, description, dueDate, priority, status);
  }

  function toggleTaskStatus(taskId) {
    tasks[taskId].toggleStatus();
  }

  function getTask(taskID) {
    return tasks[taskID];
  }

  function removeTask(id) {
    delete tasks[id];
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
    updateTask,
    removeTask,
    status,
    getTask,
    toggleTaskStatus,
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

  return {
    name,
    description,
    dueDate,
    priority,
    isComplete,
    toggleStatus,
  };
};

let idCounter = 0;

export const projectLibrary = (() => {
  const projects = {};
  // todo: change to updateProject
  const addProject = function (project) {
    projects[project.id] = project;
    updateStorage();
  };
  const addNewProject = (name) => {
    const newProject = project(name, idCounter++);
    addProject(newProject);
    updateStorage();

    return newProject.id;
  };
  const getProject = function (id) {
    return projects[id] ?? null;
  };

  const updateProject = function (id, name) {
    projects[id] = project(name, id, projects[id].getTasks());
    updateStorage();
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
    projects[projectId].updateTask(
      taskId,
      name,
      description,
      dueDate,
      priority,
      status
    );
    updateStorage();
  };

  const toggleTaskStatus = function (projectId, taskId) {
    projects[projectId].toggleTaskStatus(taskId);
    updateStorage();
  };

  const deleteProject = function (id) {
    delete projects[id];
    updateStorage();
  };

  // creats a new project task and returns the task id
  const addProjectTask = function (projectId, ...taskDetails) {
    const newTaskId = projects[projectId].addTask(...taskDetails);
    updateStorage();

    return newTaskId;
  };

  const getProjectTasks = function (projectId) {
    const tasks = projects[projectId].getTasks();
    // updateStorage();

    return tasks;
  };

  const removeProjectTask = function (projectId, taskId) {
    const project = projects[projectId];
    project.removeTask(taskId);
    updateStorage();
  };

  const removeProject = function (id) {
    delete projects[id];
    updateStorage();
  };

  // const removeTask = function (projectId, taskId) {
  //   projects[projectId].removeTask(taskId);

  // };

  const clearAllProjectTasks = function (projectId) {
    projects[projectId] = project(projects[projectId].name, projectId);
    updateStorage();
  };

  const markAllTasksDone = function (projectId) {
    projects[projectId].markAllTasksDone();
    updateStorage();
  };

  const getProjects = function () {
    return projects;
  };
  const size = function () {
    return Object.keys(projects).length;
  };

  const updateStorage = function () {
    const storageStructure = {};
    // structure = projects: {project1: {task1: {name: "task1", ...}, task2: {...}}, project2: {...}}
    Object.keys(projects).forEach((key) => {
      storageStructure[key] = {
        project: projects[key],
        tasks: (function () {
          const tasks = {};
          // loop through each task and add it to the tasks object while adding the done property
          // we do this because the task factory only returns a function for getting the done propert
          // which apparently is not serializable by JSON.stringify
          Object.keys(projects[key].getTasks()).forEach((taskId) => {
            const task = projects[key].getTask(taskId);
            tasks[taskId] = Object.assign(task, { done: task.isComplete() });
          });
          return tasks;
        })(),
      };
    });
    updateLocalStorage("projects", storageStructure);
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
    // removeTask,
    clearAllProjectTasks,
    markAllTasksDone,
  };
})();
