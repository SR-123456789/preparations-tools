function loadComponent(id, path) {
  fetch(path)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = html;
    });
}

function loadConfig(callback) {
  fetch("/config.json")
    .then(res => res.json())
    .then(config => callback(config));
}

function buildSidebar(toolData) {
  const ul = document.getElementById("sidebar-tool-list");
  if (!ul) return;
  ul.innerHTML = toolData.map(t => `
    <li><a href="${t.url}" class="hover:underline">${t.name}</a></li>
  `).join("");
}

function setSiteTitle(title) {
  const el = document.getElementById("site-title");
  if (el) el.textContent = title;
  document.title = title;
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "/components/header.html");
  loadComponent("sidebar", "/components/sidebar.html");

  loadConfig(config => {
    setSiteTitle(config.siteTitle);
    buildSidebar(config.tools);
  });
});
function loadComponent(id, path) {
  fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

function loadConfig(callback) {
  fetch("/config.json")
    .then(res => res.json())
    .then(config => callback(config));
}

function populateHeader(siteTitle) {
  const titleEl = document.getElementById("site-title");
  if (titleEl) titleEl.textContent = siteTitle;
}

function populateSidebar(tools) {
  const listEl = document.getElementById("sidebar-tool-list");
  if (!listEl) return;
  listEl.innerHTML = tools.map(tool => `
    <li><a href="${tool.url}" class="hover:underline">${tool.name}</a></li>
  `).join("");
}

function populateToolGrid(tools) {
  const grid = document.getElementById("tool-grid");
  if (!grid) return;
  grid.innerHTML = tools.map(tool => `
    <a href="${tool.url}" class="block bg-white p-4 border rounded hover:bg-gray-100">
      <h2 class="text-xl font-semibold text-blue-700">${tool.name}</h2>
      <p class="text-sm text-gray-600">${tool.description}</p>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "/components/header.html");
  loadComponent("sidebar", "/components/sidebar.html");

  loadConfig(config => {
    populateHeader(config.siteTitle);
    populateSidebar(config.tools);
    populateToolGrid(config.tools);
  });
});