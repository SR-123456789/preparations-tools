function loadComponent(id, path, callback) {
  fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (typeof callback === "function") callback();
    });
}

function loadConfig(callback) {
  fetch("config.json")
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

function trackClick(name) {
  const raw = localStorage.getItem("clickStats") || "{}";
  const stats = JSON.parse(raw);
  stats[name] = (stats[name] || 0) + 1;
  localStorage.setItem("clickStats", JSON.stringify(stats));
}

function populateRecommendations(tools) {
  const list = document.getElementById("recommend-list");
  if (!list) return;
  const raw = localStorage.getItem("clickStats") || "{}";
  const stats = JSON.parse(raw);
  const ranked = tools
    .filter(tool => stats[tool.name])
    .sort((a, b) => stats[b.name] - stats[a.name])
    .slice(0, 5);
  list.innerHTML = ranked.map(tool => `
    <li><a href="${tool.url}" class="hover:underline" onclick="trackClick('${tool.name}')">${tool.name}</a></li>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadConfig(config => {
    loadComponent("header", "components/header.html", () => {
      populateHeader(config.siteTitle);
    });
    loadComponent("sidebar", "components/sidebar.html", () => {
      populateSidebar(config.tools);
      setupSidebarToggle();
      populateRecommendations(config.tools);
    });
    populateToolGrid(config.tools);
  });
});
