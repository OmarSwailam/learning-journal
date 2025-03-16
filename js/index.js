document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger")
    const navItems = document.getElementById("nav-items")
    console.log(navItems)
    console.log(hamburger)
    hamburger.addEventListener("click", (e) => {
        console.log("clicked")
        navItems.classList.toggle("expand");
    })
});