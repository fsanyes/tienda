const objetos = document.getElementById('objetos');
const templateCard = document.getElementById('template-card').content
const fragmento = document.createDocumentFragment();

let carrito = {}

let monedas = "€$£"

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
    console.log(producto);
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
        // console.log(datos);
        pintarObjetos(datos);
    } catch (error) {
        console.log("error al cargar archivo JSON")
    }
}

const pintarObjetos = datos => {
    console.log(datos);
    datos.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre;
        templateCard.querySelector('#precio').textContent = `${producto.precio}€`;
        templateCard.querySelector('img').setAttribute("src", producto.imagenes[0])
        templateCard.querySelector('button').dataset.id = producto.id;
        const clon = templateCard.cloneNode(true);
        fragmento.appendChild(clon);
    })
    objetos.appendChild(fragmento);
}

