let $ = document;

let searchInput = $.getElementById('search-input');
let searchContainer = $.querySelector('.search-input');

function focusInput(e) {
    searchContainer.classList.add('active');
}

function blurInput(e) {
    searchContainer.classList.remove('active');
}

searchInput.addEventListener('focus', focusInput);
searchInput.addEventListener('blur', blurInput);

function searchBoxActivate() {
    if (window.innerWidth <= 640) {
        let searchIcon = $.querySelector('.fa-search');
        let home = $.querySelector('.home');
        let create = $.querySelector('.create');

        searchIcon.addEventListener('click', () => {
            searchContainer.classList.add('active');
            home.classList.add('active');
            create.classList.add('active');
            searchInput.focus();
        })
        searchInput.addEventListener('blur', () => {
            blurInput();
            home.classList.remove('active');
            create.classList.remove('active');
        });
    }
}

window.addEventListener('resize', searchBoxActivate);

let navbar = $.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    if (lastScrollY < scrollY) {
        navbar.classList.add('scroll')
    } else {
        if (scrollY === 0) {
            navbar.classList.remove('scroll')
        }
    }
    lastScrollY = scrollY;
})