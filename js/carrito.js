//Funciones de carrito

let carrito = [];

const listaItems = document.getElementById("listaItems");
listaItems.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        console.log(e.target.tagName)
        eliminaItem(e.target.dataset.id)
    }
    cargaItemsAgrupados(carrito);
})

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
    //Recoge los valores de los productos agrupados
    const itemsAgrupados = Object.values(resultado)

    itemsAgrupados.forEach(item => {
        const li = document.createElement("li")
        //Clases de bootstrap
        li.classList.add("list-group-item")
        li.classList.add("d-flex")
        li.classList.add("justify-content-between")
        //Datos del producto
        li.innerHTML = `${item.nombre}, Precio: ${item.precio}, Cantidad: ${item.cantidad}
                        <button type="button" data-id=${item.id} class="btn-close" aria-label="Close"></button>`
        listaItems.append(li)
    })
}



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
