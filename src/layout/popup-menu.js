import { validate } from "../helper-functions";
// at the moment just focus on displaying project/task editing menu

// returns a popup menu element
export function getPopupMenu(type = "add", category = "project") {
  // remove any previous popup menu
  document.querySelector(".popup")?.remove();

  [type, category] = [type.toLowerCase(), category.toLowerCase()];

  // fail safe (check if type and category are valid)
  if (
    !(
      type === "add" ||
      type === "edit" ||
      category === "project" ||
      category === "task"
    )
  )
    return null;

  switch (type) {
    case "add":
      return new AddTaskMenu();
    case "edit":
      return new EditMenu(category);
    default:
      return null;
  }
}

// task priority options
const taskPriorityOptions = [
  { value: "low", text: "Low" },
  { value: "medium", text: "Medium" },
  { value: "high", text: "High" },
];

// add new task menu
const AddTaskMenu = function () {
  const popup = document.createElement("form");
  popup.classList.add("popup");

  const menuTitle = document.createElement("p");
  menuTitle.textContent = "New Task";

  const menuCloseBtn = document.createElement("ion-icon");
  menuCloseBtn.setAttribute("name", "close-outline");
  menuCloseBtn.classList.add("task-add-menu-close-btn");
  menuCloseBtn.onclick = () => {
    popup.remove();
  };

  this.taskName = document.createElement("input");
  this.taskName.setAttribute("type", "text");
  this.taskName.setAttribute("placeholder", "Task Name");
  this.taskName.classList.add("add-task-name");

  this.taskDescription = document.createElement("input");
  this.taskDescription.setAttribute("type", "text");
  this.taskDescription.setAttribute("placeholder", "Task Description");
  this.taskDescription.classList.add("add-task-description");

  this.taskDueDate = document.createElement("input");
  this.taskDueDate.setAttribute("type", "date");
  this.taskDueDate.classList.add("select-task-due-date");

  this.taskPriority = document.createElement("select");
  this.taskPriority.classList.add("select-task-priority");
  taskPriorityOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", option.value);
    optionElement.textContent = option.text;
    this.taskPriority.append(optionElement);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Add";
  submitBtn.classList.add("task-submit-button");
  // this.submitBtn.setAttribute("type", "button");
  const errorLog = document.createElement("span");
  submitBtn.append(errorLog);

  popup.append(
    menuTitle,
    this.taskName,
    this.taskDescription,
    this.taskDueDate,
    this.taskPriority,
    submitBtn,
    menuCloseBtn
  );

  // display/apppends popup menu to the DOM
  this.showMenu = function () {
    document.querySelector(".content").append(popup);
  };

  const validateInput = function () {
    // todo add more validation logic for each input
    if (!validate(this.taskName, this.taskDueDate, this.taskPriority)) {
      errorLog.textContent = "Please fill out all fields";
      return false;
    }
    return true;
  }.bind(this);

  this.setSubmitEvent = (callBack = () => {}) => {
    popup.onsubmit = (e) => {
      e.preventDefault();
      // validate all field inputs
      if (!validateInput()) return;
      // excecute the callback
      callBack();
      // remove the popup menu
      popup.remove();
    };
  };
};

const EditMenu = function (category) {
  // category can be either project or task
  const popup = document.createElement("form");
  popup.classList.add("edit", "popup");

  // shared elements
  const menuTitle = document.createElement("p");
  menuTitle.textContent = `Edit ${
    category[0].toUpperCase() + category.slice(1)
  }`;

  const menuCloseBtn = document.createElement("ion-icon");
  menuCloseBtn.setAttribute("name", "close-outline");
  menuCloseBtn.classList.add("task-add-menu-close-btn");
  menuCloseBtn.onclick = () => {
    popup.remove();
  };

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Save";
  submitBtn.classList.add("edit-submit-button");
  const errorLog = document.createElement("span");
  submitBtn.append(errorLog);

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name: ";
  this.nameInput = document.createElement("input");
  this.nameInput.setAttribute("type", "text");
  this.nameInput.id = "edit-name";
  this.nameInput.placeholder = "Name";
  this.nameInput.required = true;
  nameLabel.setAttribute("for", "edit-name");
  nameLabel.append(this.nameInput);

  // task specific elements
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description: ";
  this.descriptionInput = document.createElement("input");
  this.descriptionInput.setAttribute("type", "text");
  this.descriptionInput.id = "edit-description";
  this.descriptionInput.placeholder = "Description";
  this.descriptionInput.required = true;
  descriptionLabel.setAttribute("for", "edit-description");
  descriptionLabel.append(this.descriptionInput);

  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date: ";
  this.dueDateInput = document.createElement("input");
  this.dueDateInput.setAttribute("type", "date");
  this.dueDateInput.id = "edit-due-date";
  this.dueDateInput.required = true;
  dueDateLabel.setAttribute("for", "edit-due-date");
  dueDateLabel.append(this.dueDateInput);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority: ";
  this.priorityInput = document.createElement("select");
  this.priorityInput.id = "edit-priority";
  this.priorityInput.required = true;
  taskPriorityOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", option.value);
    optionElement.textContent = option.text;
    this.priorityInput.append(optionElement);
  });
  priorityLabel.setAttribute("for", "edit-priority");
  priorityLabel.append(this.priorityInput);

  // project specific elements
  this.markAsComplete = document.createElement("div");
  this.markAsComplete.classList.add("mark-all-done");
  this.markAsComplete.setAttribute("checked", "false");
  const markAsCompleteLabel = document.createElement("p");
  markAsCompleteLabel.textContent = "Mark all tasks as done";
  const toggleDoneBtn = document.createElement("div");
  toggleDoneBtn.classList.add("mark-all-done-btn");
  // toggleDoneBtn.setAttribute("checked", "false");
  toggleDoneBtn.onclick = () => {
    this.markAsComplete.setAttribute(
      "checked",
      this.markAsComplete.getAttribute("checked") === "true" ? "false" : "true"
    );
  };

  this.markAsComplete.append(markAsCompleteLabel, toggleDoneBtn);

  // append initial shared elements
  popup.append(menuTitle, nameLabel);
  // append task specific elements
  if (category === "task") {
    popup.append(descriptionLabel, dueDateLabel, priorityLabel);
    // change the mark as complete label
    markAsCompleteLabel.textContent = "Mark task as done";
  }
  popup.append(this.markAsComplete, submitBtn, menuCloseBtn);

  // set default display text
  this.setDisplayText = (
    name,
    description = null,
    dueDate = null,
    priority = null,
    markAsComplete = null
  ) => {
    console.log(name, description, dueDate, priority);
    this.nameInput.value = name;
    this.descriptionInput.value = description ?? "";
    this.dueDateInput.value = dueDate ?? "";
    this.priorityInput.value = priority ?? "";
    if (!!markAsComplete) {
      this.markAsComplete.setAttribute("checked", "true");
    }
  };

  const validateInput = function () {
    // todo add more validation logic for each input
    if (!validate(this.nameInput)) {
      errorLog.textContent = "Please fill out all fields";
      return false;
    }
    return true;
  }.bind(this);

  this.setSubmitEvent = (callBack = () => {}) => {
    popup.onsubmit = (e) => {
      e.preventDefault();
      if (!validateInput(this.nameInput)) {
        errorLog.textContent = "Please fill out all fields";
        return;
      }
      // excecute the callback
      callBack();
      // remove the popup menu
      popup.remove();
    };
  };

  // display/apppends popup menu to the DOM
  this.showMenu = function () {
    document.querySelector(".content").append(popup);
  };
};
