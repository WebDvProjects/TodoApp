const main = document.createElement("main");
main.classList.add("main-section");

export function getMain() {
  return main;
}

export function displayProject(project) {
  main.innerHTML = "";
  const projectTitle = document.createElement("h1");
  projectTitle.textContent = project.name;
  main.append(projectTitle);
}
