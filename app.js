const hamburger = document.querySelector("#hamburger");
const header__wraper = document.querySelector("#header__wraper");
const selected = document.querySelector("#selected");
const language__list = document.querySelector("#language__list");
const nav__list = document.querySelector("#nav__list");
const nav__wraper = document.querySelector("#nav__wraper");
const fog__background = document.querySelector("#fog__background");
const backarrow = document.querySelector("#backarrow");
const Body = document.querySelector("body");
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

// nav selecting
nav__list.addEventListener("click", (e) => {
  console.log(e.target.nextElementSibling.firstElementChild.classList);
  e.target.nextElementSibling.firstElementChild.classList.toggle("show");
  // e.target.nextElementSibling.firstElementChild.classList.toggle("show");
});
