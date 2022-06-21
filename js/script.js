// import data from "../data/houjyouki.js";
import data from "../data/tsureduregusa.js";
// import data from "../data/hyakuninissyu.js";
const { titleName, author, text, textIndent, sectionSpace } = data;

const sidebarOpenBtn = document.querySelector(".sidebar-open-btn");
const sidebarCloseBtn = document.querySelector(".sidebarR .sidebar-close-btn");
const sidebarR = document.querySelector(".sidebarR");
const container = document.querySelector(".container");
const sidebarL = document.querySelector(".sidebarL");
const colors = document.querySelector(".colors");
const mokujiText = document.querySelector(".mokuji");
const sidebarWordBox = document.querySelector(".sidebar-word-box");

// get title
document.title = `${titleName} ${author}`;

// toggle sidebarR
sidebarOpenBtn.addEventListener("click", function () {
  sidebarR.classList.add("translate-sidebar");
  sidebarL.classList.remove("translate-sidebar");
});
sidebarCloseBtn.addEventListener("click", function () {
  sidebarR.classList.remove("translate-sidebar");
});

// toggle colors
colors.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  const element = document.documentElement;
  switch (id) {
    case "white":
      element.classList.remove(...element.classList);
      document.documentElement.classList.add("white-theme");
      sidebarR.classList.remove("translate-sidebar");
      break;
    // case "gray":
    //   element.classList.remove(...element.classList);
    //   document.documentElement.classList.add("gray-theme");
    //   sidebar.classList.remove("translate-sidebar");
    //   break;
    case "black":
      element.classList.remove(...element.classList);
      document.documentElement.classList.add("dark-theme");
      sidebarR.classList.remove("translate-sidebar");
      break;
  }
});

// get mokuji
mokujiText.innerHTML = `
<div class="mokuji-title">
    <h4>${titleName}</h4>
    <h4>${author}</h4>
    </div>
    <ul>
        ${text
          .map((item, index) => {
            const { mokujiTitle, title } = item;
            return `
          <li>
            <a href="#s${index}" class="mokuji-link">
              ${mokujiTitle ? mokujiTitle : ""}
              ${title ? title : ""}
            </a>
          </li>
          `;
          })
          .join("")}
    </ul>
`;

const mokujiLink = document.querySelectorAll(".mokuji-link");
mokujiLink.forEach(function (btn) {
  btn.addEventListener("click", function () {
    sidebarR.classList.remove("translate-sidebar");
  });
});

// contents
// get title
const title = document.querySelector(".title");
title.innerHTML = `
<h1>${titleName}</h1>
<h2>${author}</h2>
`;

// get container
container.innerHTML = text
  .map((item, index) => {
    const { kobun, gendaibun, img, title } = item;
    return `  
<section class="section section${index + 1} ${sectionSpace}">
${title ? `<h3 id="s${index}">${title}</h3>` : ""}
  <div class="kobun-text">
    <p class=${textIndent ? textIndent : ""}>
      ${kobun}
    </p>
    <div class="translate">
      <!-- question button -->
      <button type="button" class="btn translate-btn section-btn">
        <span class="plus-icon">
          <i class="far fa-plus-square"></i>
        </span>
        <span class="minus-icon">
          <i class="far fa-minus-square"></i>
        </span>
      </button>
    </div>
  </div>
  <div class="translate-text">
    <p class="gendaibun-text">${gendaibun}</p>
    ${
      img
        ? `<figure class="figure">
    <img src="./img/${img}">
    </figure>`
        : ""
    }   
    
  </div>

</section>
`;
  })
  .join("");

const sections = document.querySelectorAll(".section");
sections.forEach(function (section) {
  const btn = section.querySelector(".translate-btn.section-btn");
  btn.addEventListener("click", function () {
    section.classList.toggle("show-text");
  });
});

// toggle-text
const toggleTextBtn = document.querySelector(".toggle-text-btn");
const kobunTextP = document.querySelectorAll(".kobun-text p");
const toggleTextP = document.querySelectorAll(".toggle-text p");
const translateTextP = document.querySelectorAll(".gendaibun-text");
const toggleIcon = document.querySelector(".toggle-icon i");
toggleTextBtn.addEventListener("click", function () {
  const result = container.classList.toggle("result");

  toggleIcon.classList.toggle("rotate");

  sections.forEach(function (section) {
    if (section.classList.contains("show-text")) {
      section.classList.remove("show-text");
    }
  });

  sidebarL.classList.remove("translate-sidebar");

  toggleTextP.forEach(function (item) {
    if (item.classList.contains("active-color")) {
      item.classList.remove("active-color");
    } else {
      item.classList.add("active-color");
    }
  });
  kobunTextP.forEach(function (kobun, i) {
    if (result) {
      kobun.innerHTML = `${text[i].gendaibun}`;
    } else {
      kobun.innerHTML = `${text[i].kobun}`;
      wordLink(kobun, i);
    }
  });
  translateTextP.forEach(function (translate, i) {
    if (result) {
      translate.innerHTML = `${text[i].kobun}`;
      wordLink(translate, i);
    } else {
      translate.innerHTML = `${text[i].gendaibun}`;
    }
  });
});

// toggle sidebarL
function wordLink(data, i) {
  const phrases = text[i].phrase;
  const word = data.querySelectorAll(".word");
  word.forEach(function (item, i) {
    item.addEventListener("click", function (e) {
      // イベント伝播を停止
      e.stopPropagation();
      sidebarL.classList.toggle("translate-sidebar");
      const { phrasekobun, transphrase, supplementary, className } = phrases[i];
      sidebarWordBox.innerHTML = `<h4>${phrasekobun}</h4><p>${transphrase}</p><p class=${
        className ? className : ""
      }>${supplementary ? supplementary : ""}</p>`;
    });
  });
}
kobunTextP.forEach(function (item, i) {
  const phrases = text[i].phrase;
  const word = item.querySelectorAll(".word");
  word.forEach(function (item, i) {
    item.addEventListener("click", function (e) {
      // イベント伝播を停止
      e.stopPropagation();
      sidebarL.classList.toggle("translate-sidebar");
      sidebarR.classList.remove("translate-sidebar");
      const { phrasekobun, transphrase, className, supplementary } = phrases[i];
      sidebarWordBox.innerHTML = `<h4>${phrasekobun}</h4><p>${transphrase}</p><p class=${
        className ? className : ""
      }>${supplementary ? supplementary : ""}</p>`;
    });
  });
});

const sidebarLCloseBtn = document.querySelector(".sidebarL .sidebar-close-btn");
sidebarLCloseBtn.addEventListener("click", function () {
  sidebarL.classList.remove("translate-sidebar");
});

// remove sidebar
container.addEventListener("click", function () {
  sidebarR.classList.remove("translate-sidebar");
  sidebarL.classList.remove("translate-sidebar");
});

