import { articlesArray, articleBody } from "./articles.js";

const featuredArticle = articlesArray[0];
const initialArticles = articlesArray.slice(1, 4);
const moreArticles = articlesArray.slice(4);

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navItems = document.getElementById("nav-items");
    const home = document.getElementById("home");
    const logo = document.getElementById("logo");
    const mainContainer = document.getElementById("main");

    hamburger.addEventListener("click", () => navItems.classList.toggle("expand"));
    home.addEventListener("click", renderHome);
    logo.addEventListener("click", renderHome);

    renderHome();

    function getRecentArticles(id) {
        return articlesArray
            .filter(article => article.id !== id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }

    function renderArticleCard(article) {
        return `
            <div class="article">
                <img class="article-img" src="${article.imgUrl}">
                <p class="created-at">${article.createdAt}</p>
                <a data-id="${article.id}" class="title">${article.title}</a>
                <p class="brief">${article.brief}</p>
            </div>
        `;
    }

    function addTitleListeners() {
        const titles = document.querySelectorAll(".title");
        titles.forEach(title => {
            title.addEventListener("click", (e) => {
                const articleId = parseInt(e.target.dataset.id);
                const article = articlesArray.find(a => a.id === articleId);
                if (article) renderArticle(article);
            });
        });
    }

    function renderHome() {
        mainContainer.innerHTML = `
            <div class="featured" id="featured"></div>  
            <div class="articles" id="articles"></div>
        `;

        const featuredContainer = document.getElementById("featured");
        const articlesContainer = document.getElementById("articles");

        featuredContainer.innerHTML = `
            <p class="created-at">${featuredArticle.createdAt}</p>
            <a class="title" data-id="${featuredArticle.id}">${featuredArticle.title}</a>
            <p class="brief">${featuredArticle.brief}</p>
        `;

        articlesContainer.innerHTML = initialArticles.map(renderArticleCard).join("") +
            `<button class="view-more" id="view-more">View More</button>`;

        const viewMoreBtn = document.getElementById("view-more");
        viewMoreBtn.addEventListener("click", () => {
            viewMoreBtn.style.display = 'none';
            articlesContainer.innerHTML += moreArticles.map(renderArticleCard).join("");
            addTitleListeners();
        });

        addTitleListeners();
    }

    function renderArticle(article) {
        const splitIndex = Math.floor(articleBody.length / 2);
        const firstPart = articleBody.slice(0, splitIndex);
        const secondPart = articleBody.slice(splitIndex);

        mainContainer.innerHTML = `
            <div class="article-display">
                <button class="back-btn" id="back-btn">&larr; Back</button>
                <p class="created-at">${article.createdAt}</p>
                <h1 class="title">${article.title}</h1>
                <p class="brief">${article.brief}</p>
                <img class="article-img" src="${article.imgUrl}">
                
                <h3 class="sub-label">Introduction</h3>
                <p class="article-body">${firstPart}</p>

                <h3 class="sub-label">More Details</h3>
                <p class="article-body">${secondPart}</p>
            </div>

            <div id="recent-articles" class="recent-articles">
                <h3 class="sub-label">Recent Articles</h3>
                ${getRecentArticles(article.id).map(renderArticleCard).join("")}
            </div>
        `;

        document.getElementById("back-btn").addEventListener("click", renderHome);
        addTitleListeners();
    }
});
