  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('idl');
  const nextBtn = document.getElementById('idr');

  let currentSlide = 0;
  let i=0;
  
  limpimg();
  
  //autoslider(true);

  function limpimg(){
     for (i = 1; i < slides.length; i++) {
        //x[i].style.display = "none";
        slides[i].style.display = "none";
      }
  }

  function showSlide(n) {
    //slides[currentSlide].style.left = '-80%';   
    slides[currentSlide].style.display = "none";
    
    currentSlide = (n + slides.length) % slides.length;
    
    // Agregar transición a la nueva imagen
    slides[currentSlide].style.transition = 'opacity 1s ease-in-out';
    slides[currentSlide].style.opacity = '2'; // Opacidad 1 para que aparezca

    // Mostrar la nueva imagen
    slides[currentSlide].style.display = 'block'; 
            
  }

  prevBtn.addEventListener('click', () => {
    //SI: MUESTRA LAS POSICIONES DE LAS IMAGENES DEL 
    //SLIDER 0,2,1,...
    //alert(currentSlide);
    
    showSlide(currentSlide - 1);  
  });

  nextBtn.addEventListener('click', () => {
    //SI: MUESTRA LAS POSICIONES DE LAS IMAGENES DEL 
    //SLIDER 0,1,2,...
    //alert(currentSlide);
    
    showSlide(currentSlide + 1);
  });
  
  // Función para iniciar o detener la reproducción automática
  function autoslider(start) {
    if (start) {
      const autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 2000);
    } else {
      clearInterval(autoSlideInterval);
    }
  }

  // Iniciar la reproducción automática al cargar la página
  autoslider(true);
  
  
  
  
  
  
  
  
  
  
  