import { tag, a, h1, p } from "../grecha.js";

export function configPage() {
  return tag("div",
    // top nav
    tag("nav",
      a("Home").att$("href", "#"),
      a("Configurator").att$("href", "#/config")
    ).att$("class", "navbar"),
    // config page
    tag("section",
      h1("Configurator"),
      p("now foo")
    ).att$("class", "section"),
    // footer
    tag("footer",
      p("© " + new Date().getFullYear() + " CJ's Shell")
    ).att$("class", "footer")
  ).att$("class", "container");
}
