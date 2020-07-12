"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var hamburger=document.querySelector("#hamburger"),header__wraper=document.querySelector("#header__wraper"),selected=document.querySelector("#selected"),input__form=document.querySelector("#input__form"),language__list=document.querySelector("#language__list"),login__form=document.querySelector("#login__form"),login__wraper=document.querySelector("#login__wraper"),nav__list=document.querySelector("#nav__list"),nav__wraper=document.querySelector("#nav__wraper"),fog__background=document.querySelector("#fog__background"),backarrow=document.querySelector("#backarrow"),Body=document.querySelector("body"),output=document.querySelector("#output"),add__form=document.querySelector("#add__form"),cancel__button=document.querySelector("#cancel__button"),login__cancel=document.querySelector("#login__cancel"),Actual="JavaScript",Snippet=function a(b,c,d,e){_classCallCheck(this,a),this.lang=b,this.code=c,this.tags=d,this.color=e},hideAll=function(){language__list.classList.remove("show"),nav__wraper.classList.remove("nav__wraper--show"),fog__background.classList.remove("fog__background--show"),backarrow.classList.remove("backarrow--show"),hamburger.classList.remove("hamburger--hide"),nav__list.classList.remove("nav__list--show")},loadContent=function(a){var b=document.createElement("div");b.style.backgroundColor="".concat(a.color),b.className="snippet__container",b.innerHTML="HTML"===a.lang?"<div class=\"container__menu\"></div><p class=\"snippet__text\">".concat(htmlConversion(a.code),"</p> <p class=\"language__tag\"></p>"):"<div class=\"container__menu\"><i class=\"fas fa-expand fa-2x\"></i><i class=\"far fa-edit fa-2x\"></i></div><p class=\"snippet__text\">".concat(a.code,"</p> <p class=\"language__tag\"></p>"),a.tags.forEach(function(a){b.lastElementChild.textContent+=" "+a}),output.appendChild(b)},getDataOnce=function(){db.collection("data/codeNotes/".concat(Actual)).get().then(function(a){a.forEach(function(a){loadContent(a.data()),changeHeader(a.data())})})},unsubscribe=db.collection("data/codeNotes/".concat(Actual)).onSnapshot(function(a){console.log(a)}),changeHeader=function(a){selected.parentElement.style.backgroundColor=a.color,selected.textContent=a.lang,hideAll()},htmlConversion=function(a){var b=a.split(""),c=b.map(function(a){return"<"===a?"&lt;":">"===a?"&gt;":a}),d="";return c.forEach(function(a){d+=a}),d},loadFiltered=function(a){output.innerHTML="",data.forEach(function(b){var c=_toConsumableArray(b.tags);if(b.lang===a){var d=document.createElement("div");d.style.backgroundColor="".concat(b.color),d.className="snippet__container",d.innerHTML="HTML"===a?"<div class=\"container__menu\"></div><p class=\"snippet__text\">".concat(htmlConversion(b.code),"</p> <p class=\"language__tag\"></p>"):"<div class=\"container__menu\"><i class=\"fas fa-expand fa-2x\"></i><i class=\"far fa-edit fa-2x\"></i></div><p class=\"snippet__text\">".concat(b.code,"</p> <p class=\"language__tag\"></p>"),c.forEach(function(a){d.lastElementChild.textContent+=" #"+a}),output.appendChild(d),changeHeader(b)}})};// load content first time
// getDataOnce();
// login procedure
// login cancel
// background to click for closing
// back arrow for closing navi
// hamburger menu button
// selecting from nav icons
// add snippet
// submit form to add the snippet
// cancel button to cancel adding snippet
// click on container to expand container for all snippet text
login__form.addEventListener("submit",function(a){a.preventDefault(),console.log(login__form.user__email.value,login__form.user__password.value);var b=login__form.user__email.value,c=login__form.user__password.value;auth.signInWithEmailAndPassword(b,c).then(function(){db.collection("data/codeNotes/".concat(Actual)).onSnapshot(function(a){var b=a.docChanges();b.forEach(function(a){var b=a.doc.data();loadContent(b),changeHeader(b)})})}),login__form.reset(),login__cancel.textContent="Logout",login__wraper.classList.remove("login__wraper--show")}),login__cancel.addEventListener("click",function(){login__wraper.classList.toggle("login__wraper--show"),login__form.reset()}),fog__background.addEventListener("click",function(a){console.log(a.target.id),"fog__background"===a.target.id&&(nav__wraper.classList.toggle("nav__wraper--show"),fog__background.classList.toggle("fog__background--show"),backarrow.classList.toggle("backarrow--show"),hamburger.classList.toggle("hamburger--hide"),nav__list.classList.toggle("nav__list--show"),language__list.classList.remove("show"))}),backarrow.addEventListener("click",function(){nav__wraper.classList.toggle("nav__wraper--show"),fog__background.classList.toggle("fog__background--show"),backarrow.classList.toggle("backarrow--show"),hamburger.classList.toggle("hamburger--hide"),nav__list.classList.toggle("nav__list--show"),language__list.classList.remove("show")}),hamburger.addEventListener("click",function(){// scroll to top of window to see navi
window.scrollTo(0,0),nav__wraper.classList.toggle("nav__wraper--show"),fog__background.classList.toggle("fog__background--show"),backarrow.classList.toggle("backarrow--show"),hamburger.classList.toggle("hamburger--hide"),nav__list.classList.toggle("nav__list--show")}),nav__list.addEventListener("click",function(a){console.log(a.target.classList),a.target.classList.contains("submenu")?a.target.nextElementSibling.firstElementChild.classList.toggle("show"):a.target.classList.contains("fa-code")?a.target.parentElement.nextElementSibling.firstElementChild.classList.toggle("show"):a.target.classList.contains("languageList__item")&&(Actual=a.target.textContent,output.innerHTML="",unsubscribe(),db.collection("data/codeNotes/".concat(Actual)).onSnapshot(function(a){var b=a.docChanges();b.forEach(function(a){var b=a.doc.data();loadContent(b),changeHeader(b),hideAll()})})),"add__button"===a.target.id?(add__form.classList.toggle("add__form--show"),hideAll()):a.target.classList.contains("fa-plus-circle")&&(add__form.classList.toggle("add__form--show"),hideAll()),("user__button"===a.target.id||a.target.classList.contains("fa-user"))&&login__wraper.classList.toggle("login__wraper--show"),console.log(Actual)}),input__form.addEventListener("submit",function(a){a.preventDefault();// sending data to firestore
var b=new Snippet,c=input__form.tags__input.value.split(" "),d=[];d=c.map(function(a){return"#"+a}),b.tags=d,b.code=input__form.snippet__input.value;var e=document.getElementsByName("category");// adding to firestore procedure
// close add__form after sending data to firestore
e.forEach(function(a){a.checked&&(b.color=a.dataset.color,b.lang=a.value)}),console.log(b),db.collection("data/codeNotes/".concat(b.lang,"/")).add({lang:b.lang,code:b.code,tags:b.tags,color:b.color})["catch"](function(a){return console.error(a)}),add__form.classList.remove("add__form--show")}),cancel__button.addEventListener("click",function(a){//because cancel__button is inside form & that causes page refresh
add__form.classList.remove("add__form--show"),a.preventDefault(),input__form.reset()}),output.addEventListener("click",function(a){a.target.classList.contains("snippet__container")?(a.target.classList.toggle("snippet__container--expand"),a.target.children[1].classList.toggle("snippet__text--expand")):a.target.classList.contains("snippet__text")&&(a.target.classList.toggle("snippet__text--expand"),a.target.parentElement.classList.toggle("snippet__container--expand"))});