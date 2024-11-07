
// iglsitwebapp.js

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('idl');
const nextBtn = document.getElementById('idr');

let currentSlide = 0;

// Inicializa la primera imagen (ya tiene la clase 'active' aplicada)

function showSlide(n) {
  // Elimina la clase 'active' de la imagen actual
  slides[currentSlide].classList.remove('active');

  // Calcula la siguiente imagen
  currentSlide = (n + slides.length) % slides.length;

  // Agrega la clase 'active' a la nueva imagen
  slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});



