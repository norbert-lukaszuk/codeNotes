const hamburger = document.querySelector("#hamburger");
const nav__wraper = document.querySelector("#nav__wraper");
const tiles = document.querySelector("#tiles");
const Body = document.querySelector("body");
hamburger.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
  tiles.classList.toggle("tiles--show");
});
