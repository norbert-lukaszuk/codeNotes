const snippets = [
  {
    lang: "Java Script",
    code:
      "x===5 <br>? return 'equale to five' <br>: return 'not equal to five'",
    tags: ["ternary", "operator"],
  },
  {
    lang: "CSS",
    code: ".element{<br> coolor: red;<br> background-color: gree<br>}",
    tags: ["color", "background"],
  },
];
localStorage.setItem("snippets", JSON.stringify(snippets));
