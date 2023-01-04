export function getHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const titleLogo = document.createElement("div");
  titleLogo.classList.add("title-logo");
  titleLogo.textContent = "TODO APP";

  const menuIcon = document.createElement("div");
  menuIcon.classList.add("menu-icon");
  const iconSvg = `<svg id="svg-menu-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px" fill-rule="nonzero"><g fill="#fff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M0,7.5v5h50v-5zM0,22.5v5h50v-5zM0,37.5v5h50v-5z"></path></g></g></svg>`;
  menuIcon.innerHTML = iconSvg;
  header.append(titleLogo, menuIcon);
  return header;
}
