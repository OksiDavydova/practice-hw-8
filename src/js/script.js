import galleryItems from './app.js';

console.log(galleryItems);
const containerGalleryRefs = document.querySelector('.js-gallery');
const lightboxModalRefs = document.querySelector('.js-lightbox');
const overlayModal =document.querySelector('.lightbox__overlay');
const imgModal = document.querySelector('.lightbox__image');

const btnCloseModalRefs = document.querySelector('.lightbox__button'); 
 let activeIndex = null;
const createImageEl=(acc,{preview, original, description},index) =>
  acc + `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-id=${index}
      alt="${description}"
    />
  </a>
</li>
`;

const markup = galleryItems.reduce(createImageEl,'');
containerGalleryRefs.insertAdjacentHTML('beforeend',markup);

// console.log(containerGalleryRefs);

containerGalleryRefs.addEventListener('click', openModalHandler);
btnCloseModalRefs.addEventListener('click',closeModalHandler);
overlayModal.addEventListener('click',closeModalHandler);
lightboxModalRefs.addEventListener('click', closeModal);

function openModalHandler(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  lightboxModalRefs.classList.add('is-open');
  // galleryItems.forEach((el,index) )
  // activeIndex = index
  openBigImg(e);
  window.addEventListener("keyup", closeModalESC);
  // window.addEventListener('keydown', changeByArrows);
};

function openBigImg(e) {
  imgModal.src = e.target.dataset.source;
  imgModal.alt = e.target.dataset.alt;
  imgModal.id = e.target.dataset.id;
}

function closeModalHandler(e) {
  lightboxModalRefs.classList.remove('is-open');
  refreshAttributes();
  window.removeEventListener("keyup", closeModalESC);
};
// console.log(imgModal);

function closeModalESC(e) {
  if (e.key !== "Escape") {
    return;
  }
  toggleModal();
  refreshAttributes();
}

function toggleModal() {
  lightboxModalRefs.classList.toggle('is-open');
}

function refreshAttributes() {
  imgModal.setAttribute('src','');
  imgModal.setAttribute('alt','');
  imgModal.setAttribute('id','');
}

// function closeModal() {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }
//   lightboxModalRefs.classList.remove('is-open');
// }

// function changeByArrows() {
//   if (e.key === "ArrowRigth") {
   
//   }
// }


// function keyboardManipulation({ key }) {
//   switch (key) {
//     case gallery.length - 1 > activeIndex && "ArrowRight":
//       activeIndex += 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex > 0 && "ArrowLeft":
//       activeIndex -= 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === gallery.length - 1 && "ArrowRight":
//       activeIndex = 0;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === 0 && "ArrowLeft":
//       activeIndex = gallery.length - 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case "Escape":
//       closeModal();
//       break;
//     default:
//       alert("что-то пошло не так");
//   }
// }

