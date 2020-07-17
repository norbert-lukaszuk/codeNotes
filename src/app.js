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
const user__button = document.querySelector("#user__button");
const status = document.querySelector("#status");
const status__wraper = document.querySelector("#status__wraper");
const count = document.querySelector("#count");
let Actual = "JavaScript";
class Snippet {
  constructor(lang, code, tags, color, time) {
    this.lang = lang;
    this.code = code;
    this.tags = tags;
    this.color = color;
    this.time = time;
  }
}
console.log(status__wraper);
// hide all navi elements
const hideAll = () => {
  language__list.classList.remove("show");
  nav__wraper.classList.remove("nav__wraper--show");
  fog__background.classList.remove("fog__background--show");
  backarrow.classList.remove("backarrow--show");
  hamburger.classList.remove("hamburger--hide");
  nav__list.classList.remove("nav__list--show");
};
// count containers in output
const countSnippets = () => output.querySelectorAll(".snippet__container").length
// show status notification for period of time
const showStatus = (massage, time) => {
  status__wraper.classList.add("status__wraper--show");
  status__wraper.firstElementChild.textContent = massage;
  setTimeout(() => { status__wraper.classList.remove("status__wraper--show") }, time)
}
// get data from firestore to edit
const getDataToEdit = async (id) => {
  const resp = await db.collection(`data/codeNotes/${Actual}`).doc(id).get()
  const code = resp.docs;
  return code
  // .then(resp => resp.data().code);
}
// load the the one container in output
const loadContent = (data, id) => {
  const container = document.createElement("div");
  container.style.backgroundColor = `${data.color}`;
  container.className = "snippet__container";
  container.setAttribute("data-id", id);
  data.lang === "HTML"
    ? (container.innerHTML = `<pre class="code__block"><code class="language-html">${htmlConversion(
      data.code
    )}</code></pre><div class="container__slider"><i class="fas fa-ellipsis-v"></i><div class="containerSlider__menu"><p>Edit</p><p>Delete</p><p>Copy</p></div></div><p class="language__tag"></p>`)
    : (container.innerHTML = `<pre class="code__block"><code class="${data.prism}">${data.code}</code></pre><div class="container__slider"><i class="fas fa-ellipsis-v"></i><div class="containerSlider__menu"><p>Edit</p><p>Delete</p><p>Copy</p></div></div><p class="language__tag"></p>`);
  data.tags.forEach((e) => {
    container.children[2].innerHTML += `<span class="tag">#${e}</span>`;
  });
  output.appendChild(container);
  Prism.highlightAll();
  count.textContent = countSnippets();
};
// set onSnapshot 
const setOnSnapshot = () => {
  db.collection(`data/codeNotes/${Actual}`).onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      const data = change.doc.data();
      const id = change.doc.id;
      loadContent(data, id);
      changeHeader(data);
      Prism.highlightAll();
      count.textContent = countSnippets();
    });
  });

}
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

// html tag conversion to show code without browser interpeting it
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
// load snippets only with tag, that was clicked
const query = (tag) => {
  // firebase queries
  db.collection(`data/codeNotes/${Actual}`).where("tags", "array-contains", tag).get()
    // .then(console.log(tag))
    .then(querySnapshot => {
      output.innerHTML = '';
      querySnapshot.forEach(e => {
        loadContent(e.data(), e.id);
      })
    })
    // .then(count.textContent = countSnippets())
    .catch(err => console.log(err));
}
// check if user is signed in 
auth.onAuthStateChanged(user => {
  //if signin
  if (user) {
    setOnSnapshot(); // load content after signin passed
    user__button.firstElementChild.className = "fas fa-sign-out-alt fa-2x";
    showStatus("You'r signin!", 3000);
    user__button.addEventListener("click", e => {
      hideAll();
      auth.signOut();
    })
  }
  //if signout
  else {
    user__button.firstElementChild.className = "fas fa-user fa-2x";
    selected.textContent = 'Sign in to use';
    selected.parentElement.style.backgroundColor = 'var(--headerColor)';
    output.innerHTML = '';
    login__wraper.classList.add("login__wraper--show");
    showStatus("You'r signout !", 3000)
  }
})


// login procedure
login__form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = login__form.user__email.value;
  const password = login__form.user__password.value;
  auth.signInWithEmailAndPassword(user, password).then(() => {
    setOnSnapshot();
  });
  login__form.reset();
  login__wraper.classList.remove("login__wraper--show");
});

// login cancel
login__cancel.addEventListener("click", (e) => {
  login__wraper.classList.toggle("login__wraper--show");
  login__form.reset();
  hideAll();
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
      console.log(changes);
      changes.forEach((change) => {
        const data = change.doc.data();
        const id = change.doc.id;
        loadContent(data, id);
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
    hideAll();
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
  tagged = arr.map((e) => e);
  newSnippet.tags = tagged;
  newSnippet.code = input__form.snippet__input.value;
  // set time stamp on snippet (??db.Timestamp dosn't work)
  newSnippet.time = firebase.firestore.Timestamp.fromDate(new Date());
  // get info from radio button
  const category = document.getElementsByName("category");
  category.forEach((e) => {
    if (e.checked) {
      newSnippet.color = e.dataset.color;
      newSnippet.lang = e.value;
      newSnippet.prism = e.dataset.prism;
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
      prism: newSnippet.prism,
      time: newSnippet.time,
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
  console.log(e.target.parentElement.parentElement)
  // expand after click on text
  if (e.target.parentElement.children[0].classList.contains("code__block")) {
    e.target.parentElement.children[0].classList.toggle("code__block--expand");
    e.target.parentElement.parentElement.classList.toggle("snippet__container--expand");
  }
  // load only snippets with that tag
  else if (e.target.className === "tag") {
    let tag = e.target.innerText.slice(1); //get tag clicked
    query(tag);
  }
  else if (e.target.classList.contains("fa-ellipsis-v")) {
    console.log(e.target.nextElementSibling);
    e.target.parentElement.classList.toggle("container__slider--show");//expand slider
    e.target.classList.toggle("containerSlider__dots--move");// move slider dots to up corner
    e.target.nextElementSibling.classList.toggle("containerSlider__menu--show")// show slider menu
  }
  else if (e.target.textContent === "Edit") { //edit the snippet
    // const code = e.target.parentElement.parentElement.parentElement.children[0].firstElementChild.firstElementChild.textContent;// get the snippet text after click on slider menu Edit
    const id = e.target.parentElement.parentElement.parentElement.dataset.id; // get the snippet text after click on 
    console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
    // add__form.classList.toggle("add__form--show");
    // input__form.snippet__input.textContent = code;
    console.log(getDataToEdit(id))

  }
});
