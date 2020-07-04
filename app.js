const hamburger = document.querySelector("#hamburger");
const header__wraper = document.querySelector("#header__wraper");
const selected = document.querySelector("#selected");
const language__list = document.querySelector("#language__list");
const nav__list = document.querySelector("#nav__list");
const nav__wraper = document.querySelector("#nav__wraper");
const fog__background = document.querySelector("#fog__background");
const backarrow = document.querySelector("#backarrow");
const Body = document.querySelector("body");
const output = document.querySelector("#output");
import data from "./data.js";
// load the the content
const loadContent = () => {
  data.forEach((e) => {
    const container = document.createElement("div");
    container.style.backgroundColor = `${e.color}`;
    container.className = "snippet__container";
    container.innerHTML = `<p class="snippet__text">${e.code}</p> <p class="language__tag">${e.lang}</p>`;
    Body.appendChild(container);
  });
};
// loadContent();
// filter by language
const loadFiltered = (lang) => {
  output.innerHTML = "";
  data.forEach((e) => {
    if (e.lang === lang) {
      const container = document.createElement("div");
      container.style.backgroundColor = `${e.color}`;
      container.className = "snippet__container";
      container.innerHTML = `<p class="snippet__text">${e.code}</p> <p class="language__tag">${e.lang}</p>`;
      output.appendChild(container);
    }
  });
};
loadFiltered("Java Script");
// change header text and color

const changeHeader = (element) => {
  selected.parentElement.style.backgroundColor = getComputedStyle(
    element
  ).backgroundColor;
  selected.textContent = element.textContent;
  language__list.classList.remove("show");
  nav__wraper.classList.remove("nav__wraper--show");
  fog__background.classList.remove("fog__background--show");
  backarrow.classList.remove("backarrow--show");
  hamburger.classList.remove("hamburger--hide");
  nav__list.classList.remove("nav__list--show");
};

// background to click for closing
fog__background.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id === "fog__background") {
    nav__wraper.classList.toggle("nav__wraper--show");
    fog__background.classList.toggle("fog__background--show");
    backarrow.classList.toggle("backarrow--show");
    hamburger.classList.toggle("hamburger--hide");
    nav__list.classList.toggle("nav__list--show");
  }
});
// back arrow for closing navi
backarrow.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
  fog__background.classList.toggle("fog__background--show");
  backarrow.classList.toggle("backarrow--show");
  hamburger.classList.toggle("hamburger--hide");
  nav__list.classList.toggle("nav__list--show");
});
// hamburger menu button
hamburger.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
  fog__background.classList.toggle("fog__background--show");
  backarrow.classList.toggle("backarrow--show");
  hamburger.classList.toggle("hamburger--hide");
  nav__list.classList.toggle("nav__list--show");
});

// selecting from nav icons
nav__list.addEventListener("click", (e) => {
  console.log(e.target.classList);
  e.target.classList.contains("navList__element")
    ? e.target.nextElementSibling.firstElementChild.classList.toggle("show")
    : e.target.classList.contains("fas")
    ? e.target.parentElement.nextElementSibling.firstElementChild.classList.toggle(
        "show"
      )
    : loadFiltered(e.target.textContent); //get style of clicked element and change heder text & color
});
