const buscador = document.getElementById("buscador")
const listaObjetos = document.getElementById("dropdownMenu")

buscador.addEventListener('input',() =>{
    
    fetchBuscador(buscador.value.toLowerCase())
})

const fetchBuscador = async (input) => {
    try {
        const resul = await fetch('./src/objetos.json');
        const datos = await resul.json();
        // console.log(datos);
  
        muestraDropdown(datos, input)
        // itemsObjetos = obtenerDatos(datos)
        // console.log(itemsObjetos)
        // muestraItems(itemsObjetos, maxItems, 0)
        // nPaginas = Math.ceil(itemsObjetos.length / maxItems)
        // muestraPaginas(nPaginas)
        
    } catch (error) {
        console.log("error al cargar archivo JSON");
    }
}


function muestraDropdown(datos, input) {
    // console.log(input)
    // console.log(datos)
    
    
    while (listaObjetos.firstChild) {
        listaObjetos.removeChild(listaObjetos.firstChild);
    }

    datos.forEach(objeto => {
        const li = document.createElement("li")
        li.innerHTML = `<p class="d-flex"><a class="dropdown-item" href="detalles.html" data-id="${objeto.id}">${objeto.nombre}</a></p>`    
        listaObjetos.append(li)
    })

    const arrayLi = Array.from(listaObjetos.childNodes)
    // console.log(arrayLi)
    arrayLi.forEach(linea => {
        const contenido = linea.textContent.toLowerCase();
        if (contenido.includes(input)) {
            // console.log("dentro")
            linea.hidden = false
        }
        else {
            linea.hidden = true;
        }
    })
    
    
}

listaObjetos.addEventListener('click',(e) => {
    if(e.target.dataset.id) {
        const objeto = {
            id: e.target.dataset.id
        }
        guardaDetalles(objeto)
        // window.location.reload();
    }
})

function guardaDetalles(id) {
    localStorage.setItem("detalles", JSON.stringify(id));
    
}