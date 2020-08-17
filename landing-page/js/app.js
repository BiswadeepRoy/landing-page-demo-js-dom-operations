/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let target_section;
let sections;
let sectionOffsets = [];
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function buildMenuOnDOMLoad() {
    document.addEventListener("DOMContentLoaded", function() {
        buildNavBarMenu();
        setSectionAsActive();
    });
}

function resetAllActiveSections() {
    for (section of sections) {
        section.setAttribute("class", "section");
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNavBarMenu() {
    sections = document.querySelectorAll(".section");
    const navBar = document.getElementById('navbar__list');
    for (const section of sections) {
        let list = document.createElement('li');

        //Creating a div element to store the clickable li options with ids as listsection1.

        let listcontent = document.createElement('div');
        listcontent.setAttribute("class", "menu__link");
        listcontent.setAttribute("id", `list${section.id}`);
        listcontent.textContent = section.id.toUpperCase();

        //Creating event listeners for click events.

        listcontent.addEventListener("click", function(event) {
            target_section = event.target.innerHTML.toLowerCase();
            scrollToSection();
        });


        list.appendChild(listcontent)
        navBar.appendChild(list);
    }
}

// Add class 'active' to section when near top of viewport
function setSectionAsActive() {
    window.addEventListener("scroll", function() {

        //resetting all the active sections whenever the window is scrolled.

        resetAllActiveSections();

        let y_scroll_pos = Math.round(window.pageYOffset);
        let isActive = false;
        let iter = 0;

        //For directly scrolling through the Nav Bar

        for (section of sections) {
            sectionOffsets[iter++] = section.offsetTop
            if (y_scroll_pos == section.offsetTop || y_scroll_pos + 1 == section.offsetTop || y_scroll_pos - 1 == section.offsetTop) {
                section.setAttribute("class", "your-active-class section");
                isActive = true;
                break;
            }
        }

        //For scrolling manually

        if (!isActive) {
            for (iter = 0; iter < sectionOffsets.length - 1; iter++) {
                if (y_scroll_pos > sectionOffsets[iter] && y_scroll_pos < sectionOffsets[iter + 1]) {
                    document.getElementById(`section${iter + 1}`).setAttribute("class", "your-active-class section");
                    isActive = true;
                }
            }
            if (!isActive) {
                document.getElementById(`section${sectionOffsets.length}`).setAttribute("class", "your-active-class section");
            }
        }
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
    let section = document.getElementById(target_section);
    section.scrollIntoView();
}

/**
 * End Main Functions
 * Begin Events
 * 
 */
// Build menu 
buildMenuOnDOMLoad();