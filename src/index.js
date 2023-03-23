// const axios = require('axios/dist/node/axios.cjs');
const axios = require('axios').default;
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const formBtn = document.querySelector('button');
const gallery = document.querySelector('.gallery');

input.classList.add('inputStyle');
formBtn.classList.add('formBtnStyle');
form.addEventListener('submit', handleSubmit);



function handleSubmit(e) {
    e.preventDefault();
    const {elements: { searchQuery }} = e.currentTarget;
  
    const searchParams = new URLSearchParams({
        key: '34670935-84395b17b2cc27de21cd2945c',
        q: `${searchQuery.value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',    
    });
    
    const url = `https://pixabay.com/api/?${searchParams}`;
    console.log(url);  
    
    function fetchPictures() {
        return fetch(url)
        .then((response) => {
            if(!response.ok) {
                throw new Error(error.status)
            }
            const fetchedData = response.json();
            return fetchedData,
            console.log(fetchedData);
        })
    }
    
   fetchPictures()
    .then((pictures) => renderPictures(pictures))
    .catch((error) => console.log(error));
    
    
    function renderPictures(pictures) {
        const markup = pictures
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
            <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${views} </b>
            </p>
            <p class="info-item">
            <b>Comments ${comments} </b>
            </p>
            <p class="info-item">
            <b>Downloads ${downloads} </b>
            </p>
            </div>
            </div>`;
        })        
        .join('');
        gallery.innerHTML = markup;
        }
    
    
     
}







