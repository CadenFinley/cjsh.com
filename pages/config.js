import { tag, h1, h2, p, textarea, input } from "../grecha.js";
import { navSection } from "../components/nav.js";
import { footerSection } from "../components/footer.js";

export function configPage() {
  const initial = sessionStorage.getItem("cjshConfig") || "";
  const editor = textarea().att$("rows",20).att$("cols",80).att$("class","config-editor");
  editor.textContent = initial;

  const generationSection = tag("div").att$("class","generation-suite card");
  function loadTemplate(url) {
    fetch(url).then(r=>r.text()).then(content => {
      editor.textContent = content;
      sessionStorage.setItem("cjshConfig", content);
      updateSummary(content);
      customizationSection.style.display = 'block';
      generationSection.style.display = 'none';
    });
  }
  generationSection.append(
    tag("h2","Generate Config"),
    tag("button","cjprofile").att$("class","btn").onclick$(()=>loadTemplate("/ref/cjprofile")),
    tag("button","cjshrc").att$("class","btn").onclick$(()=>loadTemplate("/ref/cjshrc"))
  );
  generationSection.style.display = initial.trim() ? 'none' : 'block';

  const fileInput = tag("input")
    .att$("type","file").att$("accept",".rc,.profile,.sh,.js").att$("class","file-input")
    .onchange$((e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        editor.textContent = content;
        sessionStorage.setItem("cjshConfig", content);
        updateSummary(content);
        customizationSection.style.display = 'block';
        generationSection.style.display = 'none';
      };
      reader.readAsText(file);
    });
  const summarySection = tag("div").att$("class","settings-summary card");

  function parseSettings(text) {
    const lines = text.split(/\r?\n/);
    return lines.reduce((acc,line) => {
      const t = line.trim();
      if (!t || t.startsWith('#')) return acc;
      let m;
      if ((m = t.match(/^export\s+([A-Z0-9_]+)=['"]?(.*?)['"]?$/i)))
        acc.push({ label:`ENV ${m[1]} = ${m[2]}`, line:t });
      else if ((m = t.match(/^alias\s+([^=]+)=['"]?(.*?)['"]?$/)))
        acc.push({ label:`alias ${m[1]} -> ${m[2]}`, line:t });
      else if ((m = t.match(/^theme\s+load\s+(\S+)$/)))
        acc.push({ label:`theme ${m[1]}`, line:t });
      else if (t.startsWith('plugin ') || /^[^\s=]+$/.test(t))
        acc.push({ label:`on startup -> ${t}`, line:t });
      return acc;
    }, []);
  }

  let parsedCommands = [];
  function removeLine(raw) {
    const filtered = editor.textContent.split(/\r?\n/).filter(l=>l.trim()!==raw);
    editor.textContent = filtered.join("\n")+"\n";
    sessionStorage.setItem("cjshConfig", editor.textContent);
    updateSummary(editor.textContent);
  }

  function updateSummary(text) {
    parsedCommands = parseSettings(text);
    summarySection.innerHTML = "";
    if (parsedCommands.length) {
      summarySection.append(tag("h2","Settings Summary"));
      parsedCommands.forEach(cmd => {
        const ent = tag("div").att$("class","entry");
        const rem = tag("button","Remove").onclick$(()=>removeLine(cmd.line));
        ent.append(tag("span",cmd.label), rem);
        summarySection.append(ent);
      });
      summarySection.style.display = 'block';
    } else summarySection.style.display = 'none';
  }

  updateSummary(initial);
  editor.oninput$((e)=> {
    sessionStorage.setItem("cjshConfig", e.target.value);
    updateSummary(e.target.value);
  });

  const customizationSection = tag("div").att$("class","customization-suite card");
  customizationSection.style.display = 'none';
  customizationSection.append(tag("h2","Quick Add"));
  const menu = tag("div").att$("class","customization-menu");
  const forms = tag("div").att$("class","customization-forms");
  const menuItems = [], panels = [];
  function showPanel(name) {
    panels.forEach(p=>p.classList.remove("active"));
    menuItems.forEach(b=>b.classList.toggle("active", b.textContent===name));
    forms.querySelector(`.${name.toLowerCase()}-panel`).classList.add("active");
  }
  ["Alias","Env","Theme","Startup"].forEach(type=>{
    const btn = tag("button",type).att$("class","menu-item").onclick$(()=>showPanel(type));
    menuItems.push(btn); menu.append(btn);
  });
  const aliasPanel = tag("div").att$("class","form-panel alias-panel active");
  const aliasName=tag("input").att$("type","text").att$("placeholder","alias name").att$("class","form-input");
  const aliasCmd =tag("input").att$("type","text").att$("placeholder","command").att$("class","form-input");
  aliasPanel.append(aliasName,aliasCmd, tag("button","Add Alias").att$("class","btn primary")
    .onclick$(()=>{ const n=aliasName.value.trim(),c=aliasCmd.value.trim(); if(n&&c){
      editor.textContent+=`alias ${n}='${c}'\n`;
      sessionStorage.setItem("cjshConfig",editor.textContent);
      updateSummary(editor.textContent);
      aliasName.value=aliasCmd.value=""; } }));
  panels.push(aliasPanel);
  const envPanel = tag("div").att$("class","form-panel env-panel");
  const envName=tag("input").att$("type","text").att$("placeholder","VAR name").att$("class","form-input");
  const envVal =tag("input").att$("type","text").att$("placeholder","value").att$("class","form-input");
  envPanel.append(envName,envVal, tag("button","Add ENV").att$("class","btn secondary")
    .onclick$(()=>{ const n=envName.value.trim(),v=envVal.value.trim(); if(n){
      editor.textContent+=`export ${n}='${v}'\n`;
      sessionStorage.setItem("cjshConfig",editor.textContent);
      updateSummary(editor.textContent);
      envName.value=envVal.value=""; } }));
  panels.push(envPanel);
  const themePanel = tag("div").att$("class","form-panel theme-panel");
  const themeIn  = tag("input").att$("type","text").att$("placeholder","theme name").att$("class","form-input");
  themePanel.append(themeIn, tag("button","Load Theme").att$("class","btn secondary")
    .onclick$(()=>{ const t=themeIn.value.trim(); if(t){
      editor.textContent+=`theme load ${t}\n`;
      sessionStorage.setItem("cjshConfig",editor.textContent);
      updateSummary(editor.textContent);
      themeIn.value=""; } }));
  panels.push(themePanel);
  const startPanel = tag("div").att$("class","form-panel startup-panel");
  const startIn  = tag("input").att$("type","text").att$("placeholder","startup cmd").att$("class","form-input");
  startPanel.append(startIn, tag("button","Add Startup").att$("class","btn secondary")
    .onclick$(()=>{ const s=startIn.value.trim(); if(s){
      editor.textContent+=`${s}\n`;
      sessionStorage.setItem("cjshConfig",editor.textContent);
      updateSummary(editor.textContent);
      startIn.value=""; } }));
  panels.push(startPanel);

  forms.append(...panels);
  customizationSection.append(menu, forms);
  showPanel("Alias");

  return tag("div",
    navSection(),
    tag("section",
      h1("Configuration Suite"),
      p("Edit your configuration below. Changes are auto-saved to sessionStorage."),
      generationSection,
      fileInput, editor, summarySection, customizationSection
    ).att$("class","section"),
    footerSection()
  ).att$("class","container");
}
