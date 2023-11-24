var tabs = document.getElementsByClassName("tab");
var groups = document.getElementsByClassName("search-group");

function clearActive() {
    for (let i = 0; i < groups.length; i++) {
        let classNames = tabs[i].getAttribute("class").split(" ").filter(n => n !== "active");
        tabs[i].setAttribute("class", classNames.join());

        classNames = groups[i].getAttribute("class").split(" ").filter(n => n !== "active");
        groups[i].setAttribute("class", classNames.join());
    }
}

function onClick(e) {
    clearActive();

    e.target.setAttribute("class", e.target.getAttribute("class") + " active");
    
    let group = document.getElementById(e.target.getAttribute("data-tab"));
    group.setAttribute("class", group.getAttribute("class") + " active");
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", onClick);
}
