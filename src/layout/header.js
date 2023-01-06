export function getHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const titleLogo = document.createElement("div");
  titleLogo.classList.add("title-logo");
  titleLogo.textContent = "TODO APP";

  const menuIcon = document.createElement("div");
  menuIcon.classList.add("menu-icon");
  const iconSvg = `  <svg id="svg-menu-icon"viewBox="0 0 100 100" >
  <rect class="line top" width="80" height="10" rx="5" y=15 x=10 ></rect>
  <rect class="line middle" width="80" height="10" rx="5" y=45 x=10></rect>
  <rect class="line bottom" width="80" height="10" rx="5" y=75 x=10></rect>

</svg>`;
  menuIcon.innerHTML = iconSvg;

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("active");
  };
  header.append(titleLogo, menuIcon);
  return header;
}
