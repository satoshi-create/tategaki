
import data from "../data/mokuji.js";
const { mokuji, text } = data;


  const colors = document.querySelector(".colors");

  colors.addEventListener("click", function (e) {
    const id = e.target.dataset.id;

    const element = document.documentElement;

    switch (id) {
      case "white":
        element.classList.remove(...element.classList);
        document.documentElement.classList.add("white-theme");
        break;
      case "gray":
        element.classList.remove(...element.classList);
        document.documentElement.classList.add("gray-theme");
        break;
      case "black":
        element.classList.remove(...element.classList);
        document.documentElement.classList.add("dark-theme");
        break;
    }
  });

  const mokujiText = document.querySelector(".translate-text");
  const container = document.querySelector(".container");

  mokujiText.innerHTML = mokuji
    .map((item, index) => {
      return `
<li>
  <a href="#s${index}">
    <h3>${item}</h3>
  </a>
</li>
`;
    })
    .join("");

  const navs = document.querySelector(".nav");
  const navsBtn = navs.querySelector(".translate-btn.nav-btn");
  navsBtn.addEventListener("click", function () {
    navs.classList.toggle("show-text");
  });

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
    
     ${
       phrase
         ? `<ul class="phrase-text">
    ${phrase
      .map((item, index) => {
        return `
                  <li>
          <h4>【${item.phrasekobun}】</h4>
          <p>${item.transphrase}</p>
         </li>
    `;
      })
      .join("")}
    
    </ul>`
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
      section.classList.add("red");
      sections.forEach(function (item) {
        if (item !== section) {
          item.classList.remove("show-text");
        }
      });
      section.classList.toggle("show-text");
    });
  });

  const toggleTextBtn = document.querySelector(".toggle-text-btn");
  const kobunTextP = document.querySelectorAll(".kobun-text p");
  const translateTextP = document.querySelectorAll(
    ".translate-text .gendaibun-text"
  );
  const toggleIcon = document.querySelector(".toggle-icon i");

  toggleTextBtn.addEventListener("click", function () {
    const result = container.classList.toggle("result");
    toggleIcon.classList.toggle("rotate");
    kobunTextP.forEach(function (kobun, i) {
      if (result) {
        kobun.innerHTML = `${text[i].gendaibun}`;
      } else {
        kobun.innerHTML = `${text[i].kobun}`;
      }
    });
    translateTextP.forEach(function (translate, i) {
      if (result) {
        translate.innerHTML = `${text[i].kobun}`;
      } else {
        translate.innerHTML = `${text[i].gendaibun}`;
      }
    });
  });

  // ---fetch mokuji.json---

  // $.ajax({
  //   url: url,
  //   type: "GET",
  //   dataType: "json",
  // })
  //   .done(function (data) {
  //     console.log(data);
  //     // loading.classList.add("success")
  //     const { mokuji } = data;
  //     const { text } = data;
  //     console.log(text);
  //     mokujiText.innerHTML = mokuji
  //       .map((item, index) => {
  //         return `
  //     <li>
  //         <a href="#s${index}">
  //           <h3>${item}</h3>
  //         </a>
  //       </li>
  //     `;
  //       })
  //       .join("");
  //     const navs = document.querySelector(".nav");
  //     const navsBtn = navs.querySelector(".translate-btn.nav-btn");
  //     const clickNavsBtn = navsBtn.addEventListener("click", function () {
  //       navs.classList.toggle("show-text");
  //     });
  //     container.innerHTML = text
  //       .map((item, index) => {
  //         const { kobun, gendaibun, title, phrase } = item;
  //         return `
  //       <section class="section section${index + 1}">
  //         <div class="kobun-text">
  //           ${title ? title : ""}
  //           <p>
  //             ${kobun}
  //           </p>
  //           <div class="translate">
  //             <!-- question button -->
  //             <button type="button" class="btn translate-btn section-btn">
  //               <span class="plus-icon">
  //                 <i class="far fa-plus-square"></i>
  //               </span>
  //               <span class="minus-icon">
  //                 <i class="far fa-minus-square"></i>
  //               </span>
  //             </button>
  //           </div>
  //         </div>
  //         <div class="translate-text">
  //           <p class="gendaibun-text">${gendaibun}</p>

  //            ${
  //              phrase
  //                ? `<ul class="phrase-text">
  //           ${phrase
  //             .map((item, index) => {
  //               return `
  //                         <li>
  //                 <h4>【${item.phrasekobun}】</h4>
  //                 <p>${item.transphrase}</p>
  //                </li>
  //           `;
  //             })
  //             .join("")}

  //           </ul>`
  //                : ""
  //            }

  //            </div>

  //       </section>
  //     `;
  //       })
  //       .join("");

  //     const sections = document.querySelectorAll(".section");
  //     sections.forEach(function (section) {
  //       const btn = section.querySelector(".translate-btn.section-btn");

  //       btn.addEventListener("click", function () {
  //         section.classList.add("red");
  //         sections.forEach(function (item) {
  //           if (item !== section) {
  //             item.classList.remove("show-text");
  //           }
  //         });
  //         section.classList.toggle("show-text");
  //       });
  //     });

  //     const div = document.querySelector(".div");
  //     const btn = document.querySelector("button");
  //     const A = document.querySelectorAll(".A");
  //     const B = document.querySelectorAll(".B");

  //     const toggleTextBtn = document.querySelector(".toggle-text-btn");
  //     const kobunTextP = document.querySelectorAll(".kobun-text p");
  //     const translateTextP = document.querySelectorAll(
  //       ".translate-text .gendaibun-text"
  //     );
  //     const toggleIcon = document.querySelector(".toggle-icon i");

  //     toggleTextBtn.addEventListener("click", function () {
  //       const result = container.classList.toggle("result");
  //       toggleIcon.classList.toggle("rotate");
  //       kobunTextP.forEach(function (kobun, i) {
  //         if (result) {
  //           kobun.innerHTML = `${text[i].gendaibun}`;
  //         } else {
  //           kobun.innerHTML = `${text[i].kobun}`;
  //         }
  //       });
  //       translateTextP.forEach(function (translate, i) {
  //         if (result) {
  //           translate.innerHTML = `${text[i].kobun}`;
  //         } else {
  //           translate.innerHTML = `${text[i].gendaibun}`;
  //         }
  //       });
  //     });
  //   })
  //   .fail(function (data) {
  //     console.log("error");
  //   });
