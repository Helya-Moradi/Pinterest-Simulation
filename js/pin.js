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


let locationParams = new URLSearchParams(location.search);
let locationId = locationParams.get('id');

let titleAndId = locationId.split('/');
let title = titleAndId[0];
let id = titleAndId[1];

let imagePart = $.querySelector('.image-part');
let imagePartImg = $.querySelector('.image-part img');
let commentTitle = $.querySelector('.comment-title');
let save = $.querySelector('.save');

fetch(`https://api.unsplash.com/search/photos?query=${title} &per_page=1200&client_id=5OXcnxdQpZLtAG0_jRNpqEQhTlUOQL3TKviFAUbBKm8`)
    .then(res => res.json())
    .then(data => {
        let image = data.results.find(result => {
            return result.id === id;
        })

        imagePart.style.backgroundColor = image.color;
        imagePartImg.setAttribute('src', image.urls.regular);
        if (image.description) {
            if (image.description.length > 60) {
                let titleSplit = image.description.split('');
                let selectedTitle = titleSplit.splice(0, 60);
                let titleJoin = selectedTitle.join('');
                commentTitle.innerHTML = titleJoin;
            } else {
                commentTitle.innerHTML = image.description;
            }
        }


        //it's failed
        
        // save.addEventListener('click', () => {
        //     let url = image.links.download_location;
        //     var binaryData = [];
        //     binaryData.push(url);
        //     console.log(binaryData);
        //     fetch(binaryData, {
        //             mode: 'no-cors'
        //         })
        //         .then(res => res.blob())
        //         .then(blob => {
        //             let blobUrl = URL.createObjectURL(blob);
        //             let a = document.createElement('a');
        //             // a.download = url.replace(/^.*[\\\/]/, '');
        //             a.download="image.jpeg"
        //             a.href = blobUrl;
        //             document.body.appendChild(a);
        //             a.click();
        //             a.remove();

        //         })
        // })

    });







let backBtn = $.querySelector('.back');

backBtn.addEventListener('click', () => {
    history.back();
})