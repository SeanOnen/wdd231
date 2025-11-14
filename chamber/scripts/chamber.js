/* =====================================================
    GLOBAL CONSTANTS
===================================================== */
const OPENWEATHER_API_KEY = "20447614806a17996b963c696e69009c";
const LAT = 0.3476;  // Kampala
const LON = 32.5825;

/* =====================================================
    HAMBURGER MENU
===================================================== */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("active")
    );
  });
}

/* =====================================================
    ACTIVE NAV LINK HIGHLIGHTING
===================================================== */
const currentPage = location.pathname.split("/").pop();

document.querySelectorAll(".nav-list a").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

/* =====================================================
    WEATHER (HOME PAGE)
===================================================== */
async function loadWeather() {
  try {
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    const currentRes = await fetch(urlCurrent);
    const currentData = await currentRes.json();

    document.getElementById("current-temp").textContent =
      Math.round(currentData.main.temp) + "°C";

    document.getElementById("current-desc").textContent =
      currentData.weather[0].description;

    // Forecast
    const forecastRes = await fetch(urlForecast);
    const forecastData = await forecastRes.json();

    const noonData = forecastData.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    const forecast = document.getElementById("forecast");

    forecast.innerHTML = noonData
      .map((item) => {
        const date = new Date(item.dt_txt);
        return `
        <div class="forecast-day">
            <strong>${date.toLocaleDateString("en-US", { weekday: "short" })}</strong>
            <p>${Math.round(item.main.temp)}°C</p>
        </div>`;
      })
      .join("");
  } catch (err) {
    console.error("Weather failed:", err);
  }
}

/* Run only on home page */
if (document.getElementById("current-temp")) {
  loadWeather();
}

/* =====================================================
    MEMBER SPOTLIGHTS (HOME PAGE)
===================================================== */
async function loadSpotlights() {
  const res = await fetch("data/members.json");
  const members = await res.json();

  const premium = members.filter((m) => m.membershipLevel >= 2);

  const shuffled = premium.sort(() => Math.random() - 0.5);

  const selected = shuffled.slice(0, 3);

  const container = document.getElementById("spotlights");

  container.innerHTML = selected
    .map(
      (m) => `
    <div class="spotlight-card level-${m.membershipLevel}">
      <img src="${m.image}" alt="${m.name}">
      <h3>${m.name}</h3>
      <p>${m.phone}</p>
      <p>${m.address}</p>
      <p><a href="${m.website}" target="_blank">Visit Website</a></p>
    </div>
  `
    )
    .join("");
}

if (document.getElementById("spotlights")) {
  loadSpotlights();
}

/* =====================================================
    DIRECTORY PAGE: MEMBERS + GRID/LIST VIEW
===================================================== */
async function loadMembers(view = "grid") {
  const response = await fetch("data/members.json");
  const members = await response.json();
  renderMembers(members, view);
}

function renderMembers(members, view) {
  const container = document.getElementById("members");
  if (!container) return;

  if (view === "grid") {
    container.classList.add("grid");
    container.classList.remove("list");
    container.innerHTML = members
      .map(
        (m) => `
      <div class="member-card level-${m.membershipLevel}">
        <img src="${m.image}" alt="${m.name}">
        <h3>${m.name}</h3>
        <p>${m.category}</p>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p><a href="${m.website}" target="_blank">Website</a></p>
        <p>${m.description}</p>
      </div>`
      )
      .join("");
  } else {
    container.classList.add("list");
    container.classList.remove("grid");
    container.innerHTML = members
      .map(
        (m) => `
      <div class="member-list-item level-${m.membershipLevel}">
        <div class="member-info">
          <h3>${m.name}</h3>
          <p>${m.category} | Level ${m.membershipLevel}</p>
          <p>${m.address} | ${m.phone}</p>
          <p><a href="${m.website}" target="_blank">Website</a></p>
          <p>${m.description}</p>
        </div>
      </div>`
      )
      .join("");
  }
}

/* Run only on directory page */
if (document.getElementById("members")) {
  loadMembers();

  document.getElementById("grid-view").addEventListener("click", () => {
    loadMembers("grid");
  });

  document.getElementById("list-view").addEventListener("click", () => {
    loadMembers("list");
  });
}

/* =====================================================
    FOOTER
===================================================== */
document.getElementById("currentYear").textContent =
  new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Updated: " + document.lastModified;
