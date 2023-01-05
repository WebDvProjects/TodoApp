// contains functions that are needed by more than one script
// this prevents cyclic dependencies

const veil = document.createElement("div");
veil.classList.add("veil");
veil.addEventListener("click", () => {
  // remove pop up if veil is clicked
  document.querySelector(".popup").remove();
  // todo if under 560px and sidemenu is open then close it (set the hamburger icon to inactive)
});
document.querySelector(".content").append(veil);

export function toggleVeil() {
  if (veil.classList.contains("disabled")) {
    veil.classList.remove("disabled");
  } else {
    veil.classList.add("disabled");
  }
}

export function validate(...inputs) {
  // validate input
  const result = inputs.reduce((totality, input) => {
    return totality && input.value.length > 0 && input.validity.valid;
  }, true);
  return result;
}
