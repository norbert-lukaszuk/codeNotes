const hamburger = document.querySelector("#hamburger");
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
