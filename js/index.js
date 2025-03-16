import { articlesArray } from "./articles.js";

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger")
    const navItems = document.getElementById("nav-items")
    hamburger.addEventListener("click", (e) => {
        console.log("clicked")
        navItems.classList.toggle("expand");
    })

    const featuredArticle = articlesArray[0]
    const articles = articlesArray.slice(1);


    const featuredContainer = document.getElementById("featured")
    featuredContainer.innerHTML = `
        <p class="created-at">${featuredArticle.createdAt}</p>
        <h1 class="title">${featuredArticle.title}</h1>
        <p class="brief">${featuredArticle.brief}</p>
    `
});