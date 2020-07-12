const hamburger = document.querySelector("#hamburger");
const header__wraper = document.querySelector("#header__wraper");
const selected = document.querySelector("#selected");
const input__form = document.querySelector("#input__form");
const language__list = document.querySelector("#language__list");
const login__form = document.querySelector("#login__form");
const login__wraper = document.querySelector("#login__wraper");
const nav__list = document.querySelector("#nav__list");
const nav__wraper = document.querySelector("#nav__wraper");
const fog__background = document.querySelector("#fog__background");
const backarrow = document.querySelector("#backarrow");
const Body = document.querySelector("body");
const output = document.querySelector("#output");
const add__form = document.querySelector("#add__form");
const cancel__button = document.querySelector("#cancel__button");
const login__cancel = document.querySelector("#login__cancel");
let Actual = "JavaScript";

class Snippet {
  constructor(lang, code, tags, color) {
    this.lang = lang;
    this.code = code;
    (this.tags = tags), (this.color = color);
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
// load the the one container in output
const loadContent = (data) => {
  const container = document.createElement("div");
  container.style.backgroundColor = `${data.color}`;
  container.className = "snippet__container";
  data.lang === "HTML"
    ? (container.innerHTML = `<div class="container__menu"></div><p class="snippet__text">${htmlConversion(
      data.code
    )}</p> <p class="language__tag"></p>`)
    : (container.innerHTML = `<div class="container__menu"><i class="fas fa-expand fa-2x"></i><i class="far fa-edit fa-2x"></i></div><p class="snippet__text">${data.code}</p> <p class="language__tag"></p>`);
  data.tags.forEach((e) => {
    container.lastElementChild.textContent += " " + e;
  });
  output.appendChild(container);
};

// get data from firestore once
const getDataOnce = () => {
  db.collection(`data/codeNotes/${Actual}`)
    .get()
    .then((doc) => {
      doc.forEach((e) => {
        loadContent(e.data());
        changeHeader(e.data());
      });
    });
};
// unsubscribe from firestore liveupdate to load data correctly after changing language to show
const unsubscribe = db
  .collection(`data/codeNotes/${Actual}`)
  .onSnapshot(function (resp) {
    console.log(resp);
  });

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
// load content first time
// getDataOnce();

// login procedure

login__form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(login__form.user__email.value, login__form.user__password.value);
  const user = login__form.user__email.value;
  const password = login__form.user__password.value;
  auth.signInWithEmailAndPassword(user, password).then(() => {
    db.collection(`data/codeNotes/${Actual}`).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        const data = change.doc.data();
        loadContent(data);
        changeHeader(data);
      });
    });
  });
  login__form.reset();
  login__cancel.textContent = "Logout";
  login__wraper.classList.remove("login__wraper--show");
});

// login cancel
login__cancel.addEventListener("click", (e) => {
  login__wraper.classList.toggle("login__wraper--show");
  login__form.reset();
});

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
  if (e.target.classList.contains("submenu")) {
    e.target.nextElementSibling.firstElementChild.classList.toggle("show");
  } else if (e.target.classList.contains("fa-code")) {
    e.target.parentElement.nextElementSibling.firstElementChild.classList.toggle(
      "show"
    );
  } else if (e.target.classList.contains("languageList__item")) {
    Actual = e.target.textContent;
    output.innerHTML = ""; // reset the output
    unsubscribe();
    db.collection(`data/codeNotes/${Actual}`).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        const data = change.doc.data();
        loadContent(data);
        changeHeader(data);
        hideAll();
      });
    });
  } //get style of clicked element and change heder text & color

  // add button click
  if (e.target.id === "add__button") {
    add__form.classList.toggle("add__form--show");
    hideAll();
  } else if (e.target.classList.contains("fa-plus-circle")) {
    add__form.classList.toggle("add__form--show");
    hideAll();
  }
  if (
    e.target.id === "user__button" ||
    e.target.classList.contains("fa-user")
  ) {
    login__wraper.classList.toggle("login__wraper--show");
  }
  console.log(Actual);
});
// add snippet
// submit form to add the snippet
input__form.addEventListener("submit", (e) => {
  e.preventDefault();
  // sending data to firestore
  let newSnippet = new Snippet();
  let arr = input__form.tags__input.value.split(" ");
  let tagged = [];
  tagged = arr.map((e) => "#" + e);
  newSnippet.tags = tagged;
  newSnippet.code = input__form.snippet__input.value;
  const category = document.getElementsByName("category");
  category.forEach((e) => {
    if (e.checked) {
      newSnippet.color = e.dataset.color;
      newSnippet.lang = e.value;
    }
  });
  console.log(newSnippet);
  // adding to firestore procedure
  db.collection(`data/codeNotes/${newSnippet.lang}/`)
    .add({
      lang: newSnippet.lang,
      code: newSnippet.code,
      tags: newSnippet.tags,
      color: newSnippet.color,
    })
    .catch((err) => console.error(err));
  // close add__form after sending data to firestore
  add__form.classList.remove("add__form--show");
});
// cancel button to cancel adding snippet
cancel__button.addEventListener("click", (e) => {
  add__form.classList.remove("add__form--show");
  e.preventDefault(); //because cancel__button is inside form & that causes page refresh
  input__form.reset();
});

// click on container to expand container for all snippet text
output.addEventListener("click", (e) => {
  // expand after click on click on container
  if (e.target.classList.contains("snippet__container")) {
    e.target.classList.toggle("snippet__container--expand");
    e.target.children[1].classList.toggle("snippet__text--expand");
    // expand after click on text
  } else if (e.target.classList.contains("snippet__text")) {
    e.target.classList.toggle("snippet__text--expand");
    e.target.parentElement.classList.toggle("snippet__container--expand");
  }
});
