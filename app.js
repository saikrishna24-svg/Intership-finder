const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const form = document.querySelector("#filter-form");
const statusMessage = document.querySelector("#status-message");
const resultsCount = document.querySelector("#results-count");

let internships = [];

function showStatus(title, message, isError = false) {
  statusMessage.hidden = false;
  statusMessage.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  statusMessage.style.borderColor = isError ? "#d98b8b" : "";
  statusMessage.style.color = isError ? "#a33b3b" : "";
}

function hideStatus() {
  statusMessage.hidden = true;
  statusMessage.textContent = "";
  statusMessage.style.borderColor = "";
  statusMessage.style.color = "";
}

function populateDomains(items) {
  const domains = [...new Set(items.map(item => item.domain))].sort();
  domainFilter.innerHTML = '<option value="all">All domains</option>';
  domains.forEach(domain => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    domainFilter.append(option);
  });
}

function createCard(item) {
  const article = document.createElement("article");
  article.className = "internship-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const mark = document.createElement("span");
  mark.className = "company-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = item.initials;
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = item.domain;
  top.append(mark, tag);

  const title = document.createElement("h3");
  title.textContent = item.title;
  const company = document.createElement("p");
  company.className = "company";
  company.textContent = item.company;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  [item.location, item.type, item.duration].forEach(value => {
    const span = document.createElement("span");
    span.textContent = value;
    meta.append(span);
  });

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const stipend = document.createElement("span");
  stipend.className = "stipend";
  stipend.textContent = item.stipend;
  const link = document.createElement("a");
  link.className = "apply-link";
  link.href = "mailto:careers@example.com?subject=" + encodeURIComponent("Interest in " + item.title);
  link.textContent = "Express interest ↗";
  link.setAttribute("aria-label", `Express interest in ${item.title} at ${item.company}`);
  bottom.append(stipend, link);

  article.append(top, title, company, meta, bottom);
  return article;
}

function render(items) {
  grid.replaceChildren();
  resultsCount.textContent = `${items.length} ${items.length === 1 ? "opportunity" : "opportunities"} found`;
  if (items.length === 0) {
    showStatus("No internships found", "Try a different keyword or choose “All domains” to see every opportunity.");
    return;
  }
  hideStatus();
  const fragment = document.createDocumentFragment();
  items.forEach(item => fragment.append(createCard(item)));
  grid.append(fragment);
}

function filterInternships() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDomain = domainFilter.value;
  const filtered = internships.filter(item => {
    const searchable = [item.title, item.company, item.domain, item.location, item.type, ...item.skills].join(" ").toLowerCase();
    const matchesQuery = searchable.includes(query);
    const matchesDomain = selectedDomain === "all" || item.domain === selectedDomain;
    return matchesQuery && matchesDomain;
  });
  render(filtered);
}

async function loadInternships() {
  try {
    const response = await fetch("internships.json");
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("The internship data format is invalid.");
    internships = data;
    populateDomains(internships);
    render(internships);
  } catch (error) {
    resultsCount.textContent = "Listings unavailable";
    showStatus("We couldn’t load internships", "Please run this project using a local web server and check that internships.json is in the project folder. " + error.message, true);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  filterInternships();
});
form.addEventListener("reset", () => {
  // Wait until the browser restores the form controls.
  requestAnimationFrame(filterInternships);
});
searchInput.addEventListener("input", filterInternships);
domainFilter.addEventListener("change", filterInternships);

loadInternships();
