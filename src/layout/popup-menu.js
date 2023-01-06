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
  const taskPriorityOptions = [
    { value: "low", text: "Low" },
    { value: "medium", text: "Medium" },
    { value: "high", text: "High" },
  ];
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

const EditMenu = function (category) {};
