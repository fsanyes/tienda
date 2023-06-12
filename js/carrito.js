//Funciones de carrito

let carrito = [];

const cargaStorage = function () {

    carrito = JSON.parse(localStorage.getItem("carrito"))
    console.log("Storage cargado: " + carrito.length + " productos")
    console.log(carrito)
}

const guardaStorage = function() {
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

const compruebaStorage = function() {
    if (typeof(Storage) !== undefined) {
        console.log("LocalStorage disponible")
    }
    else {
        console.log("LocalStorage no es soportado por el navegador")
    }
}

//Si existen varios objetos con el mismo id, no muestra los 2 si no que los agrupa
function cargaItemsAgrupados(carrito){
    const resultado = {}
    const listaItems = document.getElementById("listaItems");

    while (listaItems.firstChild) {
        listaItems.removeChild(listaItems.firstChild);
    }

    carrito.forEach(objeto => {
        const {id, nombre, precio} = objeto;

        if (resultado[id]) {
            resultado[id].precio += parseFloat(precio);
            resultado[id].cantidad++;
        }
        else {
            resultado[id] = {
                id,
                nombre,
                precio: parseFloat(precio),
                cantidad: 1
            }
        }
    })

    const objetosAgrupados = Object.values(resultado)

    objetosAgrupados.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = `id: ${item.id}, Nombre: ${item.nombre}, PrecioTotal: ${item.precio}, Cantidad: ${item.cantidad}
                        <button type="button" data-id=${item.id} class="btn-close" aria-label="Close"></button>`
        listaItems.append(li)
    })
}


// function cargaItems(carrito){
    
//     const listaItems = document.getElementById("listaItems");
//     console.log(carrito)
//     carrito.forEach(objeto => {
//         idBuscada = objeto.id;
//         const li = document.createElement("li");
//         li.innerHTML = `Id: ${objeto.id},Nombre: ${objeto.nombre},PrecioTotal: ${carrito.filter(({id}) => id === idBuscada).reduce((acc, {precio}) => acc + +precio, 0)}, Cantidad:${carrito.filter(({id}) => id===idBuscada).reduce((acc) => acc + 1, 0)}`;
//         listaItems.append(li)
//     });
// }

const listaItems = document.getElementById("listaItems");
listaItems.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        console.log(e.target.tagName)
        eliminaItem(e.target.dataset.id)
    }
    cargaItemsAgrupados(carrito);
})

// eliminaItem("6");
function eliminaItem(id) {
    const arrayObjetos = []
    const objetos = JSON.parse(localStorage.getItem("carrito"))
    objetos.forEach(objeto => {
        if (objeto.id !== id) arrayObjetos.push(objeto)
    })
    //Guarda el carrito con el nuevo array de objetos
    localStorage.setItem("carrito", JSON.stringify(arrayObjetos));
    cargaStorage();
}
// console.log(JSON.parse(localStorage.getItem("carrito")))

compruebaStorage();
cargaStorage();

cargaItemsAgrupados(carrito);



//Pruebas
// idBuscada = "2";

// const sumaPreciosPorId = carrito.filter(({id}) => id === idBuscada).reduce((acc, {precio}) => acc + +precio, 0)
// const cantidadItems = carrito.filter(({id}) => id===idBuscada).reduce((acc) => acc + 1, 0);

// const prueba = parseFloat( carrito.map(({precio}) => precio.slice(0,precio.length-1)),10);
// console.log("filtro")
// console.log(cantidadItems)
// console.log("precioTotal")
// console.log(sumaPreciosPorId);
// console.log("prueba")
// console.log(prueba)
// let setIds = new Set(carrito.map(JSON.stringify))
//  setIds = Array.from(setIds).map(JSON.parse)
// console.log("Set de ids")
// console.log(setIds)