const hamburger = document.querySelector("#hamburger");
const header__wraper = document.querySelector("#header__wraper");
const languages = document.querySelector("#languages");
const selected = document.querySelector("#selected");
const nav__wraper = document.querySelector("#nav__wraper");
const tiles = document.querySelector("#tiles");
const fog__background = document.querySelector("#fog__background");
const backarrow = document.querySelector("#backarrow");
const Body = document.querySelector("body");
// background to click for closing
fog__background.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id === "fog__background") {
    nav__wraper.classList.toggle("nav__wraper--show");
    tiles.classList.toggle("tiles--show");
    fog__background.classList.toggle("fog__background--show");
    backarrow.classList.toggle("backarrow--show");
    hamburger.classList.toggle("hamburger--hide");
  }
});
// back arrow for closing navi
backarrow.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
  tiles.classList.toggle("tiles--show");
  fog__background.classList.toggle("fog__background--show");
  backarrow.classList.toggle("backarrow--show");
  hamburger.classList.toggle("hamburger--hide");
});
// hamburger menu button
hamburger.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
  tiles.classList.toggle("tiles--show");
  fog__background.classList.toggle("fog__background--show");
  backarrow.classList.toggle("backarrow--show");
  hamburger.classList.toggle("hamburger--hide");
});

// header click to change category
header__wraper.addEventListener("click", (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === "P" || e.target.tagName === "DIV") {
    languages.classList.toggle("languages--show");
  }
});
// change the language
languages.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    console.log(e.target.innerText);
    selected.textContent = e.target.innerText;
    languages.classList.remove("languages--show");
  }
});
