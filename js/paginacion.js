
let nPaginas;
let itemsObjetos = [];
let maxItems = 12;//Max items por pagina
let paginaActual = 1;

const fetchObjetos = async () => {
    try {
        const resul = await fetch('/src/objetos.json')
        const datos = await resul.json();
        // console.log(datos);
        itemsObjetos = obtenerDatos(datos)
        // console.log(itemsObjetos)
        muestraItems(itemsObjetos, maxItems, 0)
        nPaginas = Math.ceil(itemsObjetos.length / maxItems)
        muestraPaginas(nPaginas)
        
    } catch (error) {
        console.log("error al cargar archivo JSON")
    }
}

function obtenerDatos(datos) {
    const listaObjetos = []
    datos.forEach(dato => listaObjetos.push(dato))
    return listaObjetos
}

fetchObjetos();

const botonAnterior = document.getElementById('botonAnterior');//Anterior pagina de items
const botonSiguiente = document.getElementById('botonSiguiente');//Siguiente pagina de items

botonAnterior.addEventListener('click', (e) => {
    setPagina(paginaActual - 1)
    e.preventDefault();
});

botonSiguiente.addEventListener('click', (e) => {
    setPagina(paginaActual + 1)
    e.preventDefault();
});

const setPagina = (siguientePagina) => {
    paginaActual = siguientePagina;
    //Impide que paginaActual salga del rango de paginas
    if (paginaActual < 1) paginaActual = 1;
    else if (paginaActual > nPaginas) paginaActual = nPaginas;

    //controla que items se mostraran 
    const rango = paginaActual * maxItems;
    const rangoPrev = (paginaActual - 1) * maxItems;

    manejaPaginaActiva();
    muestraItems(itemsObjetos, rango, rangoPrev);

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

function muestraItems(items, rango, rangoPrev) {
    const listaItems = document.getElementById('items');//Lista de items de la pagina
    let index = rangoPrev;
    //Limpia la lista de items
    while (listaItems.firstChild) {
        listaItems.removeChild(listaItems.firstChild);
    }

    if (rango > items.length) rango = items.length;//!Posible efecto secundario
    //Monta la lista de items
    for (index; index < rango; index++) {
        // console.log(items[index])
        const li = document.createElement("li");
        li.classList.add("list-group-item")
        // li.innerHTML = `<a href="#" class="btn btn-primary">Dato: ${items[index]}</a>`
        li.innerHTML = `<div class="card" style="width: 18rem;">
                            <img src="${items[index].imagenes[0]}" class="card-img-top" alt="${items[index].nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${items[index].nombre}</h5>
                                <p class="card-text">${items[index].descripcion}</p>
                                <button href="#" class="btn btn-primary comprar" data-id="${items[index].id}">Comprar</button>
                                <p class="m-auto p-2"><span class="text-success" id="precio">${items[index].precio}</span><span class="text-success" id="simbolo">€</span>
                                    <a href="detalles.html"><button class="btn btn-success ms-5" data-id="${items[index].id}" id="detalles">Detalles</button></a>
                                </p>
                            </div>
                        </div>`
        listaItems.append(li);
    }
}

//Muestra las paginas disponibles en el paginador
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
            e.preventDefault();
        });
        //Inserta la linea antes de la ultima linea
        botonSiguiente.parentNode.insertBefore(li, botonSiguiente);
    }
}

