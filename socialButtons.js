import { tag, a, img } from "./grecha.js";

export function socialSection() {
  return tag("section",
    h2("Connect"),
    div(
      a(img("images/github-dark.png"))
        .att$("href","https://github.com/cadenfinley")
        .att$("target","_blank"),
      a(img("images/instagram.png"))
        .att$("href","https://instagram.com/cadenfinley")
        .att$("target","_blank"),
      a(img("images/linkedin.png"))
        .att$("href","https://linkedin.com/in/cadenjfinley")
        .att$("target","_blank")
    ).att$("class","social-buttons")
  ).att$("class","section");
}
