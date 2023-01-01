export function getHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const titleLogo = document.createElement("div");
  titleLogo.classList.add("title-logo");
  titleLogo.textContent = "TODO APP";
  header.append(titleLogo);
  return header;
}
