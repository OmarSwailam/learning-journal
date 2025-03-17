import { articlesArray, articleBody } from "./articles.js";

const featuredArticle = articlesArray[0]
const articles = articlesArray.slice(1, 4);
const moreArticles = articlesArray.slice(4);

function getRecentArticles(id) {
    const filteredArticles = articlesArray.filter(article => article.id !== id);
    const shuffledArticles = filteredArticles.sort(() => Math.random() - 0.5);
    return shuffledArticles.slice(0, 3);
}

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger")
    const navItems = document.getElementById("nav-items")
    const home = document.getElementById("home");
    const logo = document.getElementById("logo");
    const mainContainer = document.getElementById("main")

    function toggleHamburger() {
        console.log("clicked")
        navItems.classList.toggle("expand");
    }

    function renderHome() {
        mainContainer.innerHTML = `
            <div class="featured" id="featured"></div>  
            <div class="articles" id="articles"></div>
        `
        const featuredContainer = document.getElementById("featured")
        const articlesContainer = document.getElementById("articles")


        featuredContainer.innerHTML = `
            <p class="created-at">${featuredArticle.createdAt}</p>
            <a class="title" data-id="${featuredArticle.id}" >${featuredArticle.title}</a>
            <p class="brief">${featuredArticle.brief}</p>
        `

        articlesContainer.innerHTML = articles.map((article) => {
            return `
            <div class="article">
                <img class="article-img" src=${article.imgUrl}>
                <p class="created-at">${article.createdAt}</p>
                <a data-id="${article.id}" class="title">${article.title}</a>
                <p class="brief">${article.brief}</p>
            </div>
        `
        }).join("") + `
            <button class="view-more" id=view-more>View More</button>
        `
        let titles = document.querySelectorAll(".title")

        const viewMoreBtn = document.getElementById("view-more")
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener("click", (e) => {
                viewMoreBtn.style.display = 'none';
                articlesContainer.innerHTML += moreArticles.map((article) => {
                    return `
                    <div class="article">
                        <img class="article-img" src=${article.imgUrl}>
                        <p class="created-at">${article.createdAt}</p>
                        <a data-id="${article.id}" class="title">${article.title}</a>
                        <p class="brief">${article.brief}</p>
                    </div>    
                `
                }).join("")
                titles = document.querySelectorAll(".title")
                titles.forEach((title) => {
                    title.addEventListener("click", (e) => {
                        console.log("clicked")
                        const articleId = parseInt(e.target.dataset.id);
                        renderArticle(articlesArray.filter((article) => article.id === articleId)[0])
                    })
                })
            })
        }

        titles.forEach((title) => {
            title.addEventListener("click", (e) => {
                console.log("clicked")
                const articleId = parseInt(e.target.dataset.id);
                renderArticle(articlesArray.filter((article) => article.id === articleId)[0])
            })
        })
    }

    function renderArticle(article) {
        const bodyLength = articleBody.length;
        const splitIndex = Math.floor(bodyLength / 2);
        const firstPart = articleBody.slice(0, splitIndex);
        const secondPart = articleBody.slice(splitIndex);

        mainContainer.innerHTML = `
        <div class="article-display">
            <button class="back-btn" id=back-btn> &larr; back </button>
            <p class="created-at">${article.createdAt}</p>
            <h1 class="title">${article.title}</h1>
            <p class="brief">${article.brief}</p>
            <img class="article-img" src=${article.imgUrl}>
            <h3 class="sub-label">Introduction</h3>
            <p class="article-body">${firstPart}</p>

            <h3 class="sub-label">More Details</h3>
            <p class="article-body">${secondPart}</p>
        </div>
        <div id="recent-articles" class="recent-articles"></div>

    `
        const backBtn = document.getElementById("back-btn")
        backBtn.addEventListener("click", renderHome)

        const recentArticlesContainer = document.getElementById("recent-articles")
        recentArticlesContainer.innerHTML = `<h3 class="sub-label">Recent Articles</h3>` +
            getRecentArticles(article.id).map((article) => {
                return `
                    <div class="article">
                        <img class="article-img" src=${article.imgUrl}>
                        <p class="created-at">${article.createdAt}</p>
                        <a data-id="${article.id}" class="title">${article.title}</a>
                        <p class="brief">${article.brief}</p>
                    </div>
                `
            }).join("")
        titles = document.querySelectorAll(".title")
        titles.forEach((title) => {
            title.addEventListener("click", (e) => {
                console.log("clicked")
                const articleId = parseInt(e.target.dataset.id);
                renderArticle(articlesArray.filter((article) => article.id === articleId)[0])
            })
        })
    }

    hamburger.addEventListener("click", toggleHamburger)
    home.addEventListener("click", renderHome);
    logo.addEventListener("click", renderHome);

    renderHome()
});