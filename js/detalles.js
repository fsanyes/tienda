
const cargaStorageDetalles = function () {
    const detallesJSON = localStorage.getItem("detalles");

    if (detallesJSON) {
        const objeto = JSON.parse(detallesJSON);
        idStorage = objeto.id;
        console.log("Storage cargado, Detalles id: " + idStorage);
        // console.log(id)
        fetchObjetos();
    }
    else {
        return
    }
}

const fetchObjetos = async () => {
    try {
        const resul = await fetch('./src/objetos.json');
        const datos = await resul.json();
        console.log(datos);
        const objetoSeleccionado = datos.filter(({id}) => id === +idStorage);
        console.log(objetoSeleccionado);
        muestraDetalles(objetoSeleccionado[0])
        // itemsObjetos = obtenerDatos(datos)
        // console.log(itemsObjetos)
        // muestraItems(itemsObjetos, maxItems, 0)
        // nPaginas = Math.ceil(itemsObjetos.length / maxItems)
        // muestraPaginas(nPaginas)
        
    } catch (error) {
        console.log("error al cargar archivo JSON");
    }
}

let idStorage;
cargaStorageDetalles();


function muestraDetalles(objeto) {
    const div = document.createElement("div");
    const contenedorDetalles = document.getElementById("detalles");
    div.classList.add("card")
    div.innerHTML = `<img class="w-50" src="${objeto.imagenes[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${objeto.nombre}</h5>
                        <p class="card-text">${objeto.descripcion}</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>`
    contenedorDetalles.append(div)
}