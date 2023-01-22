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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

//creating the collection of sections and the document fragment
const Sections = document.querySelectorAll('section');
const docFragment = document.createDocumentFragment();
const navLinks = document.querySelectorAll('a');



//creating a list item for each section
Sections.forEach(Section=>{
    const anchor = document.createElement('a');
    //setting the attributes of the anchor element
    anchor.textContent = Section.dataset.nav;
    anchor.setAttribute('href',`#${Section.id}`);
    const listItem = document.createElement('li');
    //appending the anchor element as a child to the list item
    listItem.append(anchor);
    docFragment.append(listItem);

});


//creating an event listener for every nav link item
navLinks.forEach(navLink=>{
  navLink.addEventListener('click',scrollToSection);
});

//appending the listitems to the <ul>
const parentList = document.querySelector('ul');
parentList.append(docFragment);

//creating the intersection Observer that helps us figure if the section is on view
const observer = new IntersectionObserver(toggleActiveState, {
  rootMargin: '50% 0px 50% 0px',    
  // the 1 threshold means that the effect will only be applied when 100% of the section is on the screen 
  threshold:1
});
//adding each section to the observer nodelist
Sections.forEach(Section=>{
    observer.observe(Section);
});

//this is the functions that toggles the "active class" class on each section and navLink
function toggleActiveState(entries){
  entries.forEach(entry => {
    //if the section is not in view the class not active is applied so the active effect is removed
      entry.target.classList.toggle("not-active-class", !entry.isIntersecting);
      entry.target.classList.toggle("your-active-class",entry.isIntersecting);
      //checking for each navLink if it have matching ID with the section to toggle the "active class" class as well
      navLinks.forEach(navLink => {
        if(navLink.getAttribute('href') === `#${entry.target.id}`) {
          navLink.classList.toggle("item-active-class",entry.isIntersecting);
        }
        
      });
    });
}


//this function is responsible for the smooth scroll 
function scrollToSection(event){
  //preventing the default jump to the section
  event.preventDefault();
  let selectedSection;
  //checking if the clicked link has the same id of the section so then we scroll to that section
  Sections.forEach(Section=>{
    if(Section.id===event.target.getAttribute('href').substring(1)){
      selectedSection = Section;
    }
  });
  selectedSection.scrollIntoView({behavior:"smooth",block:"center"});
}

function responsiveNav() {
  var x = document.getElementById("navbar__list");
  if (x.className === "navbar__list") {
    x.className += " responsive";
  } else {
    x.className = "navbar__list";
  }
}