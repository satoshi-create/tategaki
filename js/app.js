import data from "../data/data.js";

const contentsList = document.querySelector(".conteiner-list");

console.log(data);

contentsList.innerHTML = data
  .map((item,index) => {
    const { id, titleName, author } = item;
    console.log(id);
    return `
    <a class="single-contaier"  href="tategaki.html?id=${index}">
    <h1>${titleName}</h1>
    <h3>${author}</h3>
    </a>
    `;
  })
  .join("");
