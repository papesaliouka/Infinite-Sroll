const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


const count = 30;
const apiKey = '_mfQSdNhVqZGlG0vzhYdm3XLDNePBthcIilWpaXOPXQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

async function getPhotos () {
    try{
        const response = await fetch(apiUrl);
         photosArray = await response.json();
        displayPhotos();
    }catch (error){
        console.log(error)
    }
} 



function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
const img = document.createElement('img');


function displayPhotos   () {
    imagesLoaded=0;
    totalImages= photosArray.length;
    console.log('totalImages=', totalImages)
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
             })
        img.addEventListener('load', imageLoaded)   

        item.appendChild(img);
        imageContainer.appendChild(item);
        
    })
}



window.addEventListener('scroll', ()=> {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000&& ready){
       getPhotos();
        ready = false;
   }
})


getPhotos();