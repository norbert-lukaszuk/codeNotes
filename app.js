const hamburger = document.querySelector("#hamburger");
const header__wraper = document.querySelector("#header__wraper");
const selected = document.querySelector("#selected");
const input__form = document.querySelector("#input__form");
const language__list = document.querySelector("#language__list");
const nav__list = document.querySelector("#nav__list");
const nav__wraper = document.querySelector("#nav__wraper");
const fog__background = document.querySelector("#fog__background");
const backarrow = document.querySelector("#backarrow");
const Body = document.querySelector("body");
const output = document.querySelector("#output");
const add__form = document.querySelector("#add__form");
const submit__button = document.querySelector("#submit__button");
const cancel__button = document.querySelector("#cancel__button");
import data from "./data.js";

class Snippet {
  constructor(lang, code, tags, color) {
    this.lang = lang;
    this.code = code;
    this.tags = tags,
      this.color = color
  }
}

// hide all navi elements
const hideAll = () => {
  language__list.classList.remove("show");
  nav__wraper.classList.remove("nav__wraper--show");
  fog__background.classList.remove("fog__background--show");
  backarrow.classList.remove("backarrow--show");
  hamburger.classList.remove("hamburger--hide");
  nav__list.classList.remove("nav__list--show");
};
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
  selected.parentElement.style.backgroundColor = element.color;
  selected.textContent = element.lang;
  hideAll();
};

// html tag conversion
const htmlConversion = (code) => {
  const splited = code.split("");
  const indexes = splited.map((e) => {
    if (e === "<") {
      return "&lt;";
    } else if (e === ">") {
      return "&gt;";
    } else return e;
  });
  let string = "";
  indexes.forEach((e) => {
    string += e;
  });
  return string;
};

// filter by language
const loadFiltered = (lang) => {
  output.innerHTML = "";
  data.forEach((e) => {
    const tags = [...e.tags];
    if (e.lang === lang) {
      const container = document.createElement("div");
      container.style.backgroundColor = `${e.color}`;
      container.className = "snippet__container";
      lang === "HTML"
        ? (container.innerHTML = `<div class="container__menu"></div><p class="snippet__text">${htmlConversion(
          e.code
        )}</p> <p class="language__tag"></p>`)
        : (container.innerHTML = `<div class="container__menu"><i class="fas fa-expand fa-2x"></i><i class="far fa-edit fa-2x"></i></div><p class="snippet__text">${e.code}</p> <p class="language__tag"></p>`);
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
  window.scrollTo(0, 0); // scroll to top of window to see navi
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
  if (e.target.id === "add__button") {
    add__form.classList.toggle("add__form--show");
    hideAll();
  } else if (e.target.classList.contains("fa-plus-circle")) {
    add__form.classList.toggle("add__form--show");
    hideAll();
  }
});
// add snippet
// submit form to add the snippet
input__form.addEventListener("submit", (e) => {
  e.preventDefault();
  let arr = input__form.tags__input.value.split(' ');
  let tagged = [];
  tagged = arr.map((e) => "#" + e)
  console.log(tagged);
  console.log(input__form.category.value, snippet__input.dataset.color);
})
// cancel button to cancel adding snippet
cancel__button.addEventListener("click", (e) => {
  add__form.classList.remove("add__form--show");
  e.preventDefault(); //because cancel__button is inside form & that causes page refresh
  input__form.reset();
});

// click on container to expand container for all snippet text
output.addEventListener("click", (e) => {
  // console.log(e.target.parentElement.firstElementChild);
  if (e.target.classList.contains("snippet__container")) {
    e.target.classList.toggle("snippet__container--expand");
    // console.log(e.target.children)
    e.target.children[1].classList.toggle("snippet__text--expand");
  } else if (e.target.classList.contains("snippet__text")) {
    e.target.classList.toggle("snippet__text--expand");
    e.target.parentElement.classList.toggle("snippet__container--expand");
  }
});
