// const axios = require('axios/dist/node/axios.cjs');
const axios = require('axios').default;

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';




const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const formBtn = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');



input.classList.add('inputStyle');
formBtn.classList.add('formBtnStyle');

let page = 1;
let per_page = 40;
// let searchedValue = form.elements.searchQuery.value
// console.log(searchedValue);



console.log(form.elements.searchQuery.value)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getPictures()
    .then(response => {
        renderPictures(response);
        page += 1;
        console.log(page);
              
    })    
    .catch(function (error) {
        if(error.response) {
            console.log(error.response.data);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else {
            console.log('Error', error.message);
        }
    })

});

loadMoreBtn.addEventListener('click', () => {
    getPictures()
    .then(response => {
        renderPictures(response);
        page += 1;
        console.log(page);
              
    })    
    .catch(function (error) {
        if(error.response) {
            console.log(error.response.data);
        }
        else if(error.request) {
            console.log(error.request);
        }
        else {
            console.log('Error', error.message);
        }
    })
})
 
   
async function getPictures() {

    const searchParams = new URLSearchParams({
        key: '34670935-84395b17b2cc27de21cd2945c',
        // q: form.elements.searchQuery.value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: per_page,    
    });

    const response = await axios.get('https://pixabay.com/api/?' + `${searchParams}&q=` + form.elements.searchQuery.value);   
    console.log(response);  
    console.log('https://pixabay.com/api/?' + `${searchParams}&q=` + form.elements.searchQuery.value);          
    return response;            
}   

function renderPictures(response) {
    const totalHits = response.data.total;
    const pictures =  response.data.hits;
    const totalPages = Math.ceil(totalHits / per_page);
    
    // console.log(searchedPics);
    console.log(page);
    console.log(totalPages);    

    if (pictures.length < 1 ) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }    
    else {
        loadMoreBtn.classList.add('isVisible');
        Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);           
        const markup = (pictures)
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `                
            <div class="photo-card">
            <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" 
            width=360
            height=240/>
            </a> 
            <div class="info">
            <p class="info-item">
            <b>Likes <span class="info-numbers">${likes}</span></b>
            </p>
            <p class="info-item">
            <b>Views <span class="info-numbers">${views}</span> </b>
            </p>
            <p class="info-item">
            <b>Comments <span class="info-numbers">${comments}</span> </b>
            </p>
            <p class="info-item">
            <b>Downloads <span class="info-numbers">${downloads}</span> </b>
            </p>
            </div>
            </div>
            `;
        })        
        .join('');
        gallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh(); 

        if (page > totalPages) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");            
        } 
    }     
} 




const lightbox = new SimpleLightbox('.gallery a');





