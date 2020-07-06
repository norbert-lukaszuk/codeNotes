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
const big__screen = document.querySelector("#big__screen");
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
// change header text and color

const changeHeader = (element) => {
  // selected.parentElement.style.backgroundColor = getComputedStyle(
  //   element
  // ).backgroundColor;
  selected.parentElement.style.backgroundColor = element.color;
  selected.textContent = element.lang;
  language__list.classList.remove("show");
  nav__wraper.classList.remove("nav__wraper--show");
  fog__background.classList.remove("fog__background--show");
  backarrow.classList.remove("backarrow--show");
  hamburger.classList.remove("hamburger--hide");
  nav__list.classList.remove("nav__list--show");
};

// html tag conversion 
const htmlConversion = (code) => {
  const splited = code.split("");
  const indexes = splited.map((e) => {
    if (e === "<") {
      return "&lt;"
    }
    else if (e === ">") {
      return "&gt;"
    }
    else return e

  })
  let string = '';
  indexes.forEach(e => {
    string += e;
  })
  return string
}

// filter by language
const loadFiltered = (lang) => {
  output.innerHTML = "";
  data.forEach((e) => {
    const tags = [...e.tags];
    if (e.lang === lang) {
      const container = document.createElement("div");
      container.style.backgroundColor = `${e.color}`;
      container.className = "snippet__container";
      lang === "HTML" ? container.innerHTML = `<div class="container__menu"></div><p class="snippet__text">${htmlConversion(e.code)}</p> <p class="language__tag"></p>` : container.innerHTML = `<div class="container__menu"><i class="fas fa-expand fa-2x"></i><i class="far fa-edit fa-2x"></i></div><p class="snippet__text">${e.code}</p> <p class="language__tag"></p>`;
      tags.forEach((e) => {
        container.lastElementChild.textContent += " #" + e;
      });
      output.appendChild(container);
      changeHeader(e);
    }
  });
};
loadFiltered("Java Script");

// background to click for closing
fog__background.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id === "fog__background") {
    nav__wraper.classList.toggle("nav__wraper--show");
    fog__background.classList.toggle("fog__background--show");
    backarrow.classList.toggle("backarrow--show");
    hamburger.classList.toggle("hamburger--hide");
    nav__list.classList.toggle("nav__list--show");
    language__list.classList.remove("show");

  }
});
// back arrow for closing navi
backarrow.addEventListener("click", () => {
  nav__wraper.classList.toggle("nav__wraper--show");
  fog__background.classList.toggle("fog__background--show");
  backarrow.classList.toggle("backarrow--show");
  hamburger.classList.toggle("hamburger--hide");
  nav__list.classList.toggle("nav__list--show");
  language__list.classList.remove("show");

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

// click on container show snippet in full screen mode
output.addEventListener('click', e => {
  // console.log(e.target.parentElement.firstElementChild);
  if (e.target.classList.contains("snippet__container")) {
    e.target.classList.toggle("snippet__container--expand");
    // console.log(e.target.children)
    e.target.children[1].classList.toggle("snippet__text--expand");
  }
  else if (e.target.classList.contains("snippet__text")) {
    e.target.classList.toggle("snippet__text--expand");
    e.target.parentElement.classList.toggle("snippet__container--expand");
  }
  // const text = e.target.parentElement.parentElement.children[1].textContent;
  // e.target.parentElement.parentElement.classList.add("snippet__container--grow");
  // e.target.parentElement.parentElement.children[1].classList.add("snippet__text--grow");
  // console.log(e.target.parentElement);
  // big__screen.firstElementChild.textContent = text;
  // big__screen.classList.toggle("show")


})
