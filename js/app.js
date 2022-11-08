let $ = document;

let searchInput = $.getElementById('search-input');
let searchContainer = $.querySelector('.search-input');

function focusInput() {
    searchContainer.classList.add('active');
}

function blurInput() {
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

let galleryContainer = $.querySelector('.gallery-container');

function loadImages(query) {
    fetch(`https://api.unsplash.com/search/photos?query=${query} &per_page=1200&client_id=5OXcnxdQpZLtAG0_jRNpqEQhTlUOQL3TKviFAUbBKm8`)
        .then(res => res.json())
        .then(data => {
            galleryContainer.innerHTML = '';
            data.results.forEach(result => {
                galleryContainer.insertAdjacentHTML('beforeend', ` <a class="item" style="background-color: ${result.color};" href="pin.html?id=${query}/${result.id}">
        <img src="${result.urls.regular}" alt="${result.alt_description}" class="images">
        <div class="overlay">
            <div class="head">
                <div class="profile">
                    <span class="profile-text">Profile</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="save">
                    Save
                </div>
            </div>
            <div class="foot">
                <div class="link">
                    <img src="./images/link.svg" alt="">
                    <div class="text">site.com</div>
                </div>
                <div class="share">
                    <img src="./images/share.svg" alt="">
                </div>
                <div class="more">
                    <img src="./images/more.svg" alt="">
                </div>
            </div>
        </div>
    </a>`)
            });
        })
        .catch(err => console.log(err))
}

window.load = loadImages('pinterest');

searchInput.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        if (searchInput.value) {
            blurInput();
            searchInput.value = "";
            searchInput.blur();
            loadImages(searchInput.value);
        }
    }
})