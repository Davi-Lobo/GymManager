// 
// Highlight for actual menu
// _____________________________
const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".nav-list .item .link");

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active');
    }
}