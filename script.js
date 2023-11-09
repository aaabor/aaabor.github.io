const PANEL_DISPLAY_TIME = 8000;
var slider = document.getElementById("slider");
var panels = document.getElementsByClassName("slider-panel");
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
  if (hovering) {
    changePanel = true;
    clearInterval(panelInterval);
    return;
  }

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

function onHover(_) {
  hovering = true;
}

function onLeave(_) {
  hovering = false;
  if (changePanel) {
    changePanel = false;
    nextPanel();
  }
  panelInterval = setInterval(nextPanel, PANEL_DISPLAY_TIME);
}

for (p of panels) {
  removeActiveClass(p);
}

addActiveClass(panels[0]);

panelInterval = setInterval(nextPanel, PANEL_DISPLAY_TIME);
slider.addEventListener("mouseover", onHover);
slider.addEventListener("mouseout", onLeave);