
const objetos = document.getElementById('objetos');
const templateCard = document.getElementById('template-card').content
const fragmento = document.createDocumentFragment();

// LocalStorage
const cargaStorage = function () {
    
    const carritoJSON = localStorage.getItem("carrito");
    if (carritoJSON) {
        carrito = JSON.parse(carritoJSON)
        console.log("Storage cargado: " + carrito.length + " productos")
        console.log(carrito)
        carritoActivo();
    }
    else {
        carrito = [];
    }
    
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


// Carrito
let carrito = []

compruebaStorage();

cargaStorage();



let monedas = "€$£"

// function isEmpty(obj) {
//     return Object.keys(obj).length === 0;
// }

// console.log("Carrito Vacio? = "+isEmpty(carrito));

function carritoActivo() {
    let iconoCarrito = document.getElementById('carrito');
    let nProductos = document.getElementById('nProductos');
    if (carrito.length != 0)
        iconoCarrito.classList += " active";
        
    else {
        iconoCarrito.classList = "btn btn-outline-success";
    }
    nProductos.innerHTML = carrito.length;
}

const sumaCarrito = e => {
    // console.log(e.target);
    // console.log(e.target.classList.contains('comprar'));
    if (e.target.classList.contains('comprar')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    console.log(objeto);
    const producto = {
        id: objeto.querySelector('button').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('#precio').textContent
    }
    carrito.push(producto);
    console.log(carrito);
    carritoActivo();
    guardaStorage();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

objetos.addEventListener('click', e => {
    sumaCarrito(e);
})

const fetchData = async () => {
    try {
        const resul = await fetch('/src/objetos.json')
        const datos = await resul.json();
        console.log(datos);
        pintarObjetos(datos);
    } catch (error) {
        console.log("error al cargar archivo JSON")
    }
}

//TODO: Esta será la funcion pintaDestacados
const pintarObjetos = datos => {
    datos.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre;
        templateCard.querySelector('#precio').textContent = `${producto.precio}`;
        templateCard.querySelector('img').setAttribute("src", producto.imagenes[0])
        templateCard.querySelector('button').dataset.id = producto.id;
        const clon = templateCard.cloneNode(true);
        fragmento.appendChild(clon);
    })
    objetos.appendChild(fragmento);
}
