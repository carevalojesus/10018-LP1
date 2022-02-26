function crearParrafo() {
    let parrafo = document.createElement('p');
    parrafo.textContent = 'Hiciste clic!!';
    document.body.appendChild(parrafo);
  }

  const botones = document.querySelectorAll('button');
  
  for(let i = 0; i < botones.length ; i++) {
    botones[i].addEventListener('click', crearParrafo);
  }