var tabs = document.getElementsByClassName("tab");
var groups = document.getElementsByClassName("search-group");
var inputs = document.getElementsByClassName("filter-text");
var searchBlocks = document.querySelectorAll("#saved-searches .search-block");
var activeContacts = document.querySelectorAll("#active-contact-searches .contact-block");
var inactiveContacts = document.querySelectorAll("#inactive-contact-searches .contact-block");

function clearActive() {
    for (let i = 0; i < groups.length; i++) {
        let classNames = tabs[i].getAttribute("class").split(" ").filter(n => n !== "active");
        tabs[i].setAttribute("class", classNames.join(" "));

        classNames = groups[i].getAttribute("class").split(" ").filter(n => n !== "active");
        groups[i].setAttribute("class", classNames.join(" "));
    }
}

function updateHighlights(blocks, filter, field) {
    blocks.forEach(b => {
        // Get class names without the filtered class
        let classNames = b.getAttribute("class").split(" ").filter(n => n !== "filtered");
        let filtered = false;

        let titleDiv = b.getElementsByClassName(field);
        let inner = titleDiv[0].innerHTML;

        // Remove current highlighting
        inner = inner.replace(/<\/?strong>/gi, "");

        if (filter.trim() !== "") {
            // Find instances of the current filter, case insensitive
            re = new RegExp("(?<!~~:>)" + filter + "(?!<:~~)", "gi");

            filtered = true;
            let index = inner.search(re);
            while (index !== -1) {
                filtered = false;
                let text = inner.substring(0, index);
                text += "~~:>";
                text += inner.substring(index, index + filter.length);
                text += "<:~~";
                text += inner.substring(index + filter.length);
                inner = text;
                index = inner.search(re);
            }
        }

        titleDiv[0].innerHTML = inner.replace(/~~:>/g, "<strong>").replace(/<:~~/g, "</strong>");

        if (filtered) {
            classNames.push("filtered");
        }

        b.setAttribute("class", classNames.join(" "));
    });
}

function onClick(e) {
    clearActive();

    e.target.setAttribute("class", e.target.getAttribute("class") + " active");

    let group = document.getElementById(e.target.getAttribute("data-tab"));
    group.setAttribute("class", group.getAttribute("class") + " active");
}

function onChange(e) {
    var name = e.target.getAttribute("name");

    if (name === "filterSearch") {
        updateHighlights(searchBlocks, e.target.value, "search-title");
    } else if (name == "filterActive") {
        updateHighlights(activeContacts, e.target.value, "contact-name");
    } else if (name == "filterInactive") {
        updateHighlights(inactiveContacts, e.target.value, "contact-name");
    }
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", onClick);
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", onChange);
}
