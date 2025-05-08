import { tag, router, div, a, h1, h2, h3, p } from "./grecha.js";
import { homePage } from "./pages/home.js";
import { configPage } from "./pages/config.js";

const r = router({
  "/": homePage,
  "/config": configPage
});
entry.appendChild(r);