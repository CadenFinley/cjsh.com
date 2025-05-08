import { tag, a } from "../grecha.js";
import { socialSection } from "./socialButtons.js";

export function navSection() {
  const saved = localStorage.getItem("theme");
  const fallback = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.documentElement.dataset.theme = saved || fallback;

  const isDark = document.documentElement.dataset.theme === "dark";
  const toggleInput = tag("input")
    .att$("type", "checkbox")
    .att$("id", "theme-toggle")
    .att$("checked", isDark ? "" : null);

  const toggleSwitch = tag("label",
    toggleInput,
    tag("span")
  ).att$("class", "theme-switch");

  const navEl = tag("nav",
    a("Home").att$("href", "#"),
    a("Configurator").att$("href", "#/config"),
    toggleSwitch
  ).att$("class", "navbar");

  navEl.querySelector("#theme-toggle")
    .addEventListener("change", (e) => {
      const next = e.target.checked ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    });

  navEl.appendChild(socialSection());

  return navEl;
}
