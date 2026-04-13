const API_URL = "https://ghibliapi.vercel.app/films";

let peliculas = [];
let favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        peliculas = data;
        mostrarPeliculas(peliculas);
        mostrarFavoritas();
    });

document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtradas = peliculas.filter(p =>
        p.title.toLowerCase().includes(texto)
    );

    mostrarPeliculas(filtradas);
});

function mostrarPeliculas(lista) {
    const contenedor = document.getElementById("peliculas");
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
        <div class="col-auto">
            <div class="card">
                <img src="${p.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p>🎬 ${p.director}</p>
                    <p>📅 ${p.release_date}</p>
                    <p>⭐ ${p.rt_score}</p>

                    <button class="btn btn-warning"
                        onclick="guardarFavorita('${p.id}')">
                        Añadir
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

function guardarFavorita(id) {
    const pelicula = peliculas.find(p => p.id === id);

    const existe = favoritas.find(f => f.id === id);

    if (!existe) {
        favoritas.push(pelicula);
        localStorage.setItem("favoritas", JSON.stringify(favoritas));
        mostrarFavoritas();
    }
}

function eliminarFavorita(id) {
    favoritas = favoritas.filter(f => f.id !== id);
    localStorage.setItem("favoritas", JSON.stringify(favoritas));
    mostrarFavoritas();
}

function mostrarFavoritas() {
    const contenedor = document.getElementById("favoritas");
    contenedor.innerHTML = "";

    if (favoritas.length === 0) {
        contenedor.innerHTML = "<p>No hay favoritas</p>";
        return;
    }

    favoritas.forEach(p => {
        contenedor.innerHTML += `
        <div class="col-auto">
            <div class="card border border-warning">
                <img src="${p.image}" class="card-img-top">
                <div class="card-body">
                    <h5>${p.title}</h5>
                    <p>🎬 ${p.director}</p>
                    <p>📅 ${p.release_date}</p>
                    <p>⭐ ${p.rt_score}</p>

                    <button class="btn btn-danger"
                        onclick="eliminarFavorita('${p.id}')">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}