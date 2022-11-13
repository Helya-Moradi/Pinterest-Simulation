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
            console.log(data);
            imagesGenerator(data.results, query);
        })
        .catch(err => console.log(err))
}

let lastSearch = localStorage.getItem('lastSearch') || 'pinterest';
loadImages(lastSearch);

function imagesGenerator(pinsArray, query) {
    let link;
    galleryContainer.innerHTML = '';
    pinsArray.forEach(pin => {
        if (query === "mypins") {
            link = "#";
        } else {
            link = "pin.html?id=${query}/${pin.id}";
        }
        galleryContainer.insertAdjacentHTML('beforeend', ` <a class="item" style="background-color: ${pin.color||'#e1e1e1'};" href=${link}>
    <img src="${pin.urls?.regular||pin.url}" alt="${pin.alt_description||"pin"}" class="images">
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
    })
}

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (searchInput.value) {
            loadImages(searchInput.value);
            localStorage.setItem('lastSearch', searchInput.value);
            blurInput();
            searchInput.blur();
        }
    }
})

searchInput.addEventListener('click', () => {
    searchInput.value = "";
})

let add = $.querySelector('.add');
let uploadContainer = document.querySelector('.upload-bg');

add.addEventListener('click', () => {
    uploadContainer.classList.add('active');
})

uploadContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('upload-bg')) {
        closeUploadPage();
    }
})

function closeUploadPage() {
    uploadContainer.classList.remove('active');
    upload.classList.remove('active');
    elements.forEach(element => {
        if (element.classList.contains('warn')) {
            element.classList.remove('warn');
        }
        if (element.value) {
            element.value = "";
        }
    })
}

let finput = $.querySelector('.finput');
let loadImage = $.querySelector('.load-image');
let upload = $.querySelector('.upload');

finput.addEventListener('change', (e) => {
    let imageUrl = URL.createObjectURL(finput.files[0]);
    loadImage.setAttribute('src', imageUrl);
    upload.classList.add('active');
})

finput.addEventListener('dragenter dragover', (e) => {
    console.log('enter-over');
    e.preventDefault()

})

let uploadBtn = $.querySelector('.upload-btn');

let uploadImg = $.querySelector('.upload-img');
let titleInput = $.querySelector('.t-input');
let captionInput = $.querySelector('.c-input');
let linkInput = $.querySelector('.l-input');

let mypinArray = [];

uploadBtn.addEventListener('click', () => {

    if (finput.files[0] && titleInput.value && captionInput.value && linkInput.value) {

        let id = Math.floor(Math.random() * 10 ** 10);

        let ownSrc = {
            id: id,
            url: URL.createObjectURL(finput.files[0]),
            description: titleInput.value,
            caption: captionInput.value,
            link: linkInput.value
        }
        mypinArray.push(ownSrc);
        imagesGenerator(mypinArray, 'mypins');
        closeUploadPage();

    } else {
        if (!finput.files[0]) {
            uploadImg.classList.add('warn');
        }
        if (!titleInput.value) {
            titleInput.classList.add('warn');
        }
        if (!captionInput.value) {
            captionInput.classList.add('warn');
        }
        if (!linkInput.value) {
            linkInput.classList.add('warn');
        }
    }
})

let elements = [uploadImg, titleInput, captionInput, linkInput];

elements.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.remove('warn');
    })
})