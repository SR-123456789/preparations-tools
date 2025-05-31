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
    <a href="${tool.url}" target="_blank" class="block bg-white p-4 border rounded hover:bg-gray-100">
      <h2 class="text-xl font-semibold text-blue-700">${tool.name}</h2>
      <p class="text-sm text-gray-600">${tool.description}</p>
    </a>
  `).join("");
}

function setupSidebarToggle() {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  if (!toggle || !sidebar) return;
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "/components/header.html");
  loadComponent("sidebar", "/components/sidebar.html");

  loadConfig(config => {
    populateHeader(config.siteTitle);
    populateSidebar(config.tools);
    populateToolGrid(config.tools);
    setupSidebarToggle();
  });
});
