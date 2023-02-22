document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async () => {
    try {
        const resul = await fetch('/src/objetos.json')
        const datos = await resul.json();
        console.log(datos);
    } catch (error) {
        console.log("error al cargar archivo JSON")
    }
}