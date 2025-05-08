import { tag, a, h1, p } from "../grecha.js";
import { navSection } from "../components/nav.js";
import { footerSection } from "../components/footer.js";

export function configPage() {
  return tag("div",
    navSection(),
    // config page
    tag("section",
      h1("Configurator"),
      p("now foo")
    ).att$("class", "section"),
    // footer
    footerSection()
  ).att$("class", "container");
}
