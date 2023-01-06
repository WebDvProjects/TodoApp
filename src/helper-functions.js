// contains functions that are needed by more than one script
// this prevents cyclic dependencies

const veil = document.createElement("div");
veil.classList.add("veil");
veil.addEventListener("click", () => {
  // remove pop up if veil is clicked
  const popup = document.querySelector(".popup");
  // if (popup.classList.contains('side-bar')) return;
  popup?.remove();
  // todo if under 560px and sidemenu is open then close it (set the hamburger icon to inactive)
  let mql = window.matchMedia("(max-width: 560px)");
  if (mql.matches) {
    const hamburger = document.querySelector(".menu-icon");
    const sideMenu = document.querySelector(".side-bar");
    if (hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      sideMenu.classList.remove("active");
    }
  }
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
