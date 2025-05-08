import { socialSection } from "./socialButtons.js";

const r = router({
  "/": () => 
    tag("div",
      // top nav
      tag("nav",
        a("Home").att$("href", "#"),
        a("Configurator").att$("href", "#/config")
      ).att$("class", "navbar"),
      // hero section
      tag("section",
        tag("pre", `
   ______    _______ __  __
  / ____/   / / ___// / / /
 / /   __  / /\\__ \\/ /_/ / 
/ /___/ /_/ /___/ / __  /  
 \\____/\\____//____/_/ /_/   
        `)
      ).att$("class", "hero"),
      // overview
      tag("section",
        h2("Overview"),
        p("CJ's Shell (cjsh) is a custom login shell with out-of-the-box power, featuring an AI assistant, a language-agnostic plugin API, customizable themes, and a vibrant color engine.")
      ).att$("class", "section"),
      // installation
      tag("section",
        h2("Installation"),
        h3("macOS"),
        p(a("brew install cadenfinley/tap/cjsh")
            .att$("href", "https://github.com/CadenFinley/homebrew-tap")),
        h3("Linux"),
        p("Build from source and run the installer at ")
          .appendChild(a("tool-scripts/linux_install_from_local.sh")
            .att$("href", "#"))
          .parentNode
      ).att$("class", "section"),
      // usage
      tag("section",
        h2("Usage"),
        p("In your terminal:"),
        tag("code", "cjsh --login")
      ).att$("class", "section"),
      // config files
      tag("section",
        h2("Configuration Files"),
        p("• ~/.cjprofile (login-mode)\n• ~/.cjshrc (interactive-mode)")
      ).att$("class", "section"),
      // links
      tag("section",
        h2("Links"),
        p(a("GitHub Repository")
            .att$("href", "https://github.com/CadenFinley/CJsShell"))
      ).att$("class", "section"),
      // social connect buttons
      socialSection(),
      // footer
      tag("footer",
        p("© " + new Date().getFullYear() + " CJ's Shell")
      ).att$("class", "footer")
    ).att$("class", "container"),

  "/config": () => 
    tag("div",
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
    ).att$("class", "container")
});
entry.appendChild(r);