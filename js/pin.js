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