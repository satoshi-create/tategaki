import data from "../data/mokuji.js";
const { mokuji, phrase, text } = data;

const sidebarOpenBtn = document.querySelector(".sidebar-open-btn");
const sidebarCloseBtn = document.querySelector(".sidebarR .sidebar-close-btn");
const sidebarR = document.querySelector(".sidebarR");
const container = document.querySelector(".container");

sidebarOpenBtn.addEventListener("click", function () {
  sidebarR.classList.add("translate-sidebar");
});

sidebarCloseBtn.addEventListener("click", function () {
  sidebarR.classList.remove("translate-sidebar");
  wordSidebar.classList.remove("translate-sidebar");
});

// container.addEventListener("click", function () {
//   sidebarR.classList.remove("translate-sidebar");
// });

const colors = document.querySelector(".colors");

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

const mokujiText = document.querySelector(".mokuji");

mokujiText.innerHTML = mokuji
  .map((item, index) => {
    return `
<li>
  <a href="#s${index}" class="mokuji-link">
    ${item}
  </a>
</li>
`;
  })
  .join("");

const mokujiLink = document.querySelectorAll(".mokuji-link");

mokujiLink.forEach(function (btn) {
  btn.addEventListener("click", function () {
    sidebarR.classList.remove("translate-sidebar");
  });
});

// const navs = document.querySelector(".nav");
// const navsBtn = navs.querySelector(".translate-btn.nav-btn");
// navsBtn.addEventListener("click", function () {
//   navs.classList.toggle("show-text");
// });

container.innerHTML = text
  .map((item, index) => {
    const { kobun, gendaibun, title, phrase } = item;
    return `  
<section class="section section${index + 1}">
  <div class="kobun-text">
    ${title ? title : ""}
    <p>
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
     </div>
</section>
`;
  })
  .join("");

const sections = document.querySelectorAll(".section");
sections.forEach(function (section) {
  const btn = section.querySelector(".translate-btn.section-btn");

  btn.addEventListener("click", function () {
    // section.classList.add("red");
    // sections.forEach(function (item) {
    //   if (item !== section) {
    //     item.classList.remove("show-text");
    //   }
    // });
    section.classList.toggle("show-text");
  });
});

const toggleTextBtn = document.querySelector(".toggle-text-btn");
const kobunTextP = document.querySelectorAll(".kobun-text p");
const toggleTextP = document.querySelectorAll(".toggle-text p");
const translateTextP = document.querySelectorAll(".gendaibun-text");
const toggleIcon = document.querySelector(".toggle-icon i");

const sidebarL = document.querySelector(".sidebarL");
const sidebarWordBox = document.querySelector(".sidebar-word-box");

toggleTextBtn.addEventListener("click", function () {
  const result = container.classList.toggle("result");

  toggleIcon.classList.toggle("rotate");

  sections.forEach(function (section) {
    if (section.classList.contains("show-text")) {
      section.classList.remove("show-text");
    }
  });

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
      wordLink(kobun);
    } else {
      kobun.innerHTML = `${text[i].kobun}`;
      wordLink(kobun);
    }
  });
  translateTextP.forEach(function (translate, i) {
    if (result) {
      translate.innerHTML = `${text[i].kobun}`;
      wordLink(translate);
    } else {
      translate.innerHTML = `${text[i].gendaibun}`;
      wordLink(translate);
    }
  });
});

function wordLink(text) {
  const word = text.querySelectorAll(".word");
  word.forEach(function (item, i) {
    item.addEventListener("click", function (e) {
      // イベント伝播を停止
      e.stopPropagation();
      sidebarL.classList.toggle("translate-sidebar");
      const { phrasekobun, transphrase } = phrase[i];
      sidebarWordBox.innerHTML = `<h4>${phrasekobun}</h4><p>${transphrase}</p>`;
    });
  });
}
// const sidebarL = document.querySelector(".sidebarL");
// const sidebarWordBox = document.querySelector(".sidebar-word-box");

// translateTextP.forEach(function (translate, i) {
//   const word = translate.querySelectorAll(".word");
//   console.log(word);
//   word.forEach(function (item, i) {
//     item.addEventListener("click", function (e) {
//       console.log("word");
//     });
//   });
// });

// const sidebarWordBox = document.querySelector(".sidebar-word-box");

// const sidebarL = document.querySelector(".sidebarL");
const sidebarLCloseBtn = document.querySelector(".sidebarL .sidebar-close-btn");
const containerAll = document.querySelectorAll(".container");

containerAll.forEach(function (item) {
  const word = item.querySelectorAll(".word");
  console.log(item.querySelectorAll("section:not(.word"));
  word.forEach(function (item, i) {
    item.addEventListener("click", function (e) {
      // イベント伝播を停止
      e.stopPropagation();
      sidebarL.classList.toggle("translate-sidebar");
      const { phrasekobun, transphrase } = phrase[i];
      sidebarWordBox.innerHTML = `<h4>${phrasekobun}</h4><p>${transphrase}</p>`;
    });
  });
});

container.addEventListener("click", function () {
  sidebarR.classList.remove("translate-sidebar");
  sidebarL.classList.remove("translate-sidebar");
});

sidebarLCloseBtn.addEventListener("click", function () {
  sidebarL.classList.remove("translate-sidebar");
});
