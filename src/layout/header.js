export function getHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const titleLogo = document.createElement("div");
  titleLogo.classList.add("title-logo");
  titleLogo.textContent = "TODO APP";

  const menuIcon = document.createElement("div");
  menuIcon.classList.add("menu-icon");
  const iconSvg = `<svg id="svg-menu-icon" width="151" height="108" viewBox="0 0 151 108" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <rect id="top" x="0.782349" y="90.127" width="150" height="17.7966" />
  <rect id="middle" x="0.782349" y="45.3303" width="150" height="17.7966" />
  <rect id="bottom" x="0.782349" y="0.533722" width="150" height="17.7966" />
</svg>`;
  menuIcon.innerHTML = iconSvg;

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("active");
  };
  header.append(titleLogo, menuIcon);
  return header;
}
