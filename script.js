const PANEL_DISPLAY_TIME = 8000;
const INTERVAL_UPDATE_TIME = PANEL_DISPLAY_TIME / 400;
var displayTime = 0;
var slider = document.getElementById("slider");
var panels = document.getElementsByClassName("slider-panel");
var progressBar = document.getElementById("slider-progress");
var hovering = false;
var changePanel = false;
var currentPanel = 0;
var panelInterval;

function addActiveClass(p) {
  p.setAttribute("class", p.getAttribute("class") + " active");
}

function removeActiveClass(p) {
  let classNames = p.getAttribute("class").split(" ").filter(n => n !== "active");
  p.setAttribute("class", classNames.join(" "));
}

function nextPanel() {
  // if (hovering) {
  //   changePanel = true;
  //   clearInterval(panelInterval);
  //   return;
  // }

  removeActiveClass(panels[currentPanel]);
  
  currentPanel += 1;
  if (currentPanel >= panels.length)
    currentPanel = 0;

  addActiveClass(panels[currentPanel]);  
}

function prevPanel() {
  removeActiveClass(panels[currentPanel]);

  currentPanel -= 1;
  if (currentPanel < 0)
    currentPanel += panels.length;

  addActiveClass(panels[currentPanel]);
}

function update() {
  if (!hovering) {
    displayTime += INTERVAL_UPDATE_TIME;
    if (displayTime >= PANEL_DISPLAY_TIME) {
      nextPanel();
      displayTime = 0;
    }
    newWidth = 'width: ' + ((displayTime / PANEL_DISPLAY_TIME) * 100) + '%';
    progressBar.setAttribute("style", newWidth);
  }
}

function onHover(_) {
  hovering = true;
}

function onLeave(_) {
  hovering = false;
  // if (changePanel) {
  //   changePanel = false;
  //   nextPanel();
  //   panelInterval = setInterval(nextPanel, PANEL_DISPLAY_TIME);
  // }
}

for (p of panels) {
  removeActiveClass(p);
}

addActiveClass(panels[0]);

panelInterval = setInterval(update, INTERVAL_UPDATE_TIME);
slider.addEventListener("mouseover", onHover);
slider.addEventListener("mouseout", onLeave);