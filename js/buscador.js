const buscador = document.getElementById("buscador")
buscador.addEventListener('input',() =>{
    
    fetchBuscador(buscador.value)
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
    console.log(input)
    console.log(datos)
    const listaObjetos = document.getElementById("dropdownMenu")
    
    while (listaObjetos.firstChild) {
        listaObjetos.removeChild(listaObjetos.firstChild);
    }

    datos.forEach(objeto => {
        const li = document.createElement("li")
        li.innerHTML = `<p class="d-flex"><a class="dropdown-item" href="detalles.html">${objeto.nombre}</a><button class="btn btn-success">Detalles</button></p>`
        listaObjetos.append(li)
    })

    if(listaObjetos.childNodes) console.log(listaObjetos.childNodes)
    
    
}