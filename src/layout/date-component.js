const dateComponent = function () {
  // default date is today's date
  this.value = new Date().toISOString().slice(0, 10);
  const container = document.createElement("div");
  container.classList.add("date-component");

  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "number");
  dateInput.setAttribute("min", "1");
  dateInput.setAttribute("max", "31");

  const monthInput = document.createElement("input");
  monthInput.setAttribute("type", "number");
  monthInput.setAttribute("min", "1");
  monthInput.setAttribute("max", "12");

  const yearInput = document.createElement("input");
  yearInput.setAttribute("type", "number");
  yearInput.setAttribute("min", "1");
  yearInput.setAttribute("max", "9999");

  const errorLog = document.createElement("span");
  errorLog.classList.add("error-log");

  container.append(dateInput, monthInput, yearInput, errorLog);

  this.dateComponentSetup = (dateValue) => {
    // format: yyyy-mm-dd
    [year, month, day] = dateValue.split("-");
  };

  function updateDateValue() {}

  function validateDate() {}

  function component() {
    return container;
  }
};
