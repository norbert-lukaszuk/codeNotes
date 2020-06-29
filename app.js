const hamburger = document.querySelector("#hamburger");
const nav__wraper = document.querySelector("#nav__wraper");
const Body = document.querySelector("body");
hamburger.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
});
