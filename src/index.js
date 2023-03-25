// const axios = require('axios/dist/node/axios.cjs');

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const axios = require('axios').default;

import Notiflix from 'notiflix';



const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const formBtn = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

input.classList.add('inputStyle');
formBtn.classList.add('formBtnStyle');
form.addEventListener('submit', handleSubmit);



function handleSubmit(e) {
    e.preventDefault();
    let {elements: { searchQuery }} = e.currentTarget;
    
    const searchParams = new URLSearchParams({
        key: '34670935-84395b17b2cc27de21cd2945c',
        q: `${searchQuery.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,    
    });

    async function getPictures() {
            const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
            const pictures = await response.data.hits;
            console.log(pictures);
            return pictures;
    }
    
    let page = 1;
    getPictures()
    .then(pictures => {
        renderPictures(pictures);
        page += 1;
        if(page > 1) {
            loadMoreBtn.classList.add("isVisible");
        }
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

    function renderPictures(pictures) {
        const totalHits = pictures.length;
        if(pictures.length > 1) {
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
            gallery.innerHTML = markup;
            const lightbox = new SimpleLightbox('.gallery a');  
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
            else Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                   
        } 
          
}







