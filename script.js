const PANEL_DISPLAY_TIME = 8000;
const INTERVAL_UPDATE_TIME = PANEL_DISPLAY_TIME / 400;
var displayTime = 0;
var slider = document.getElementById("slider");
var panels = document.getElementsByClassName("slider-panel");
var progressBar = document.getElementById("slider-progress");
var nav = document.getElementById("slider-nav");
var navPrevArrow;
var navNextArrow;
var navButtons;
var hovering = false;
var changePanel = false;
var currentPanel = 0;
var panelInterval;

function setupSliderNavigation() {
  let innerHTML = '<div id="slider-prev" class="arrow"></div>';

  for (let i = 0; i < panels.length; i++) {
    innerHTML += '<div class="slider-button" data-index="' + i + '"></div>';
  }

  innerHTML += '<div id="slider-next" class="arrow"></div>';
  nav.innerHTML = innerHTML;
}

function addActiveClass(index) {
  let classNames = panels[index].getAttribute("class").split(" ").filter(n => n !== "hidden");
  classNames.push("active");
  panels[index].setAttribute("class", classNames.join(" "));
  navButtons[index].setAttribute("class", navButtons[index].getAttribute("class") + " active");
}

function addHiddenClass(index) {
  panels[index].setAttribute("class", panels[index].getAttribute("class") + " hidden");
}

function removeActiveClass(index) {
  let classNames = panels[index].getAttribute("class").split(" ").filter(n => n !== "active");
  panels[index].setAttribute("class", classNames.join(" "));

  classNames = navButtons[index].getAttribute("class").split(" ").filter(n => n !== "active");
  navButtons[index].setAttribute("class", classNames.join(" "));
}

function nextPanel() {
  removeActiveClass(currentPanel);
  setTimeout(addHiddenClass, 750, currentPanel);

  currentPanel += 1;
  if (currentPanel >= panels.length)
    currentPanel = 0;

  addActiveClass(currentPanel);  
  displayTime = 0;
  updateProgressBar();
}

function prevPanel() {
  removeActiveClass(currentPanel);
  setTimeout(addHiddenClass, 750, currentPanel);

  currentPanel -= 1;
  if (currentPanel < 0)
    currentPanel += panels.length;

  addActiveClass(currentPanel);
  displayTime = 0;
  updateProgressBar();
}

function update() {
  if (!hovering) {
    displayTime += INTERVAL_UPDATE_TIME;
    if (displayTime >= PANEL_DISPLAY_TIME) {
      nextPanel();
    }
    updateProgressBar();
  }
}

function updateProgressBar() {
  newWidth = 'width: ' + ((displayTime / PANEL_DISPLAY_TIME) * 100) + '%';
  progressBar.setAttribute("style", newWidth);
}

function onHover(_) {
  hovering = true;
}

function onLeave(_) {
  hovering = false;
}

function onClick(e) {
  let index = parseInt(e.target.getAttribute("data-index"));
  if (index !== currentPanel) {
    removeActiveClass(currentPanel);
    setTimeout(addHiddenClass, 750, currentPanel);
    currentPanel = index;
    addActiveClass(currentPanel);
  }
  
  displayTime = 0;
  updateProgressBar();
}

setupSliderNavigation();

navPrevArrow = document.getElementById("slider-prev");
navNextArrow = document.getElementById("slider-next");
navButtons = document.getElementsByClassName("slider-button");

for (let i = 0; i < panels.length; i++) {
  removeActiveClass(i);
  addHiddenClass(i);
}

addActiveClass(0);

panelInterval = setInterval(update, INTERVAL_UPDATE_TIME);
slider.addEventListener("mouseover", onHover);
slider.addEventListener("mouseout", onLeave);
navPrevArrow.addEventListener("click", prevPanel);
navNextArrow.addEventListener("click", nextPanel);
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("click", onClick);
}