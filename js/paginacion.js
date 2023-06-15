

const botonAnterior = document.getElementById('botonAnterior');//Anterior pagina de items
const botonSiguiente = document.getElementById('botonSiguiente');//Siguiente pagina de items

//Prueba    
let arrayPrueba = [];
for (let i = 0; i < 67; i++) { arrayPrueba.push(i + 1); }

let maxItems = 10;//Max items por pagina
let nPaginas = Math.ceil(arrayPrueba.length / maxItems);//Numero de paginas
let paginaActual = 1;

botonAnterior.addEventListener('click', (e) => {
    setPagina(paginaActual - 1)
    e.preventDefault();
});

botonSiguiente.addEventListener('click', (e) => {
    setPagina(paginaActual + 1)
    e.preventDefault();
});

//Muestra la primera pagina de objetos
manejaItems(arrayPrueba, maxItems, 0)
//Monta el paginador
muestraPaginas(nPaginas)
evitaDefault();
const setPagina = (siguientePagina) => {
    paginaActual = siguientePagina;
    //Impide que paginaActual salga del rango de paginas
    if (paginaActual < 1) paginaActual = 1;
    if (paginaActual > nPaginas) paginaActual = nPaginas;

    //controla que items se mostraran 
    const rango = paginaActual * maxItems;
    const rangoPrev = (paginaActual - 1) * maxItems;

    manejaPaginaActiva();
    manejaItems(arrayPrueba, rango, rangoPrev);

    // console.log("Rango: "+rango);
    // console.log("RangoPrev: "+rangoPrev);
}

//Controla que pagina se encuentra en uso
const manejaPaginaActiva = () => {
    const paginacion = document.getElementById('paginacion');//Menu de paginacion 
    const paginas = paginacion.querySelectorAll('li')
    paginas.forEach((pagina) => {
        pagina.classList.remove("active")
        const index = parseInt(pagina.dataset.index, 10);

        if (index === paginaActual) {
            pagina.classList.add("active");
        }
    })
    //Si se encuentra en la primera pagina el boton < se desactiva
    if (paginaActual === 1) botonAnterior.classList.add("disabled");
    else botonAnterior.classList.remove("disabled");
    //Si se encuentra en la ultima pagina el boton > se desactiva
    if (paginaActual === nPaginas) botonSiguiente.classList.add("disabled");
    else botonSiguiente.classList.remove("disabled")
}

function manejaItems(array, rango, rangoPrev) {
    const listaItems = document.getElementById('items');//Lista de items de la pagina
    let index = rangoPrev;
    //Limpia la lista de items
    while (listaItems.firstChild) {
        listaItems.removeChild(listaItems.firstChild);
    }

    if (rango > array.length) rango = array.length;//!Posible efecto secundario
    //Monta la lista de items
    for (index; index < rango; index++) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" class="btn btn-primary">Dato: ${array[index]}</a>`
        // li.innerHTML = `<div class="card" style="width: 18rem;">
        //                     <img src="..." class="card-img-top" alt="...">
        //                     <div class="card-body">
        //                     <h5 class="card-title">Dato: ${array[index]}</h5>
        //                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //                     <a href="#" class="btn btn-primary">Go somewhere</a>
        //                     </div>
        //                 </div>`
        listaItems.append(li);
    }
}

//Muestra las paginas disponibles en el paginador
//TODO: Modificar para presentar los objetos de objetos.json
function muestraPaginas(nPaginas) {

    for (let pagina = 1; pagina <= nPaginas; pagina++) {
        //Crea una linea
        const li = document.createElement('li');
        li.dataset.index = pagina;
        //Clase de bootstrap
        li.classList.add("page-item");
        if (pagina === 1) li.classList.add("active");//activa el boton de la pagina 1
        //Añade el enlace que cambia la pagina
        li.innerHTML = `<a href="#" class="page-link">${pagina}</a>`
        //Añade funcionalidad al boton de la pagina
        li.addEventListener("click", (e) => {
            setPagina(pagina)
            
        });
        //Inserta la linea antes de la ultima linea
        botonSiguiente.parentNode.insertBefore(li, botonSiguiente);
    }
}
//TODO: introducir esta funcion en muestraPaginas para evitar el doble addEventListener
function evitaDefault() {
    const paginacion = document.getElementById('paginacion');
    const aPaginacion = paginacion.querySelectorAll('a')
    console.log(aPaginacion)
    aPaginacion.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
        })
    })
}
