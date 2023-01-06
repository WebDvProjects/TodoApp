// script imports
import { getHeader } from "./layout/header";
import { getSidebar } from "./layout/sidebar";
import { getMain } from "./layout/main-content";
import { getFooter } from "./layout/footer";

// style imports
import "./css/styles.css";
import "./css/style-reset.css";

const content = document.querySelector(".content");

// append main layout elements to body content

content.append(getHeader(), getSidebar(), getMain(), getFooter());
