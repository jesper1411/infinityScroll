const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unspash API
const count = 5;
const apiKey = 'fpmVEa3uxITpubQsO8YiZvKECWKi58hZ3wLP6CtKb5w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosarray
    photosArray.forEach((photo) => {
        // creat <a> link to unsplash
       const item = document.createElement('a'); 
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
    //    Create <image> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    // event listener check when each is fineshed loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a> then pot both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}

// Get Photo from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        // Catch error here
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight- 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// unload
getPhotos();
