// adds storage to local storage if first time otherwise updates it
export function updateLocalStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

// returns the stored objects and parses it to JS object
export function fetchFromLocalStorage(key) {
  /* 
    Format: 
    {
        project_id: project_object, project_tasks: {task_id: task_object, ...},
    }
    */
  return JSON.parse(localStorage.getItem(key));
}
