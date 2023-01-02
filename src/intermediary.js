// contains functions that are needed by more than one script
// this prevents cyclic dependencies

export function toggleContentDisable() {
  document
    .querySelectorAll(
      ".content > :nth-child(n):not(.project-add-menu,.task-add-menu, .edit-menu)"
    )
    .forEach((element) => {
      element.classList.toggle("disabled");
    });
}

export function validate(...inputs) {
  // validate input
  const result = inputs.reduce((totality, input) => {
    return totality && input.value.length > 0 && input.validity.valid;
  }, true);
  return result;
}
