console.log("Entro index.js");

let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
// Estos son las referencias a mis inputs
const inputTitulo = document.getElementById("inputTitulo");
const inputEstreno = document.getElementById("inputEstreno");
const inputGenero = document.getElementById("inputGenero");
const inputImagen = document.getElementById("inputImagen");
const inputSinopsis = document.getElementById("inputSinopsis");

// Estas son las referencias a mis botones
const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divPeliculas = document.getElementById("divPeliculas");
const alertSinPeliculas = document.getElementById("alertSinPeliculas");

let indexEditar = null;

class Pelicula {
    constructor(titulo, estreno, genero, imagen, sinopsis) {
        this.titulo = titulo;
        this.estreno = estreno;
        this.genero = genero;
        this.imagen = imagen;
        this.sinopsis = sinopsis;
    }
}


function guardarPelicula() {
    let titulo = inputTitulo.value;
    let estreno = inputEstreno.value;
    let genero = inputGenero.value;
    let imagen = inputImagen.value;
    let sinopsis = inputSinopsis.value;

    let pelicula = new Pelicula(
        titulo,
        estreno,
        genero,
        imagen,
        sinopsis
    );
    console.log(pelicula);

    if (indexEditar === null) {
        console.log("Agregar pelicula");
        peliculas.push(pelicula);
    } else {
        peliculas[indexEditar] = pelicula;
        indexEditar = null;
        console.log("Editar pelicula");
    }
    limpiarFormularioPeliculas();
    localStorage.setItem("peliculas", JSON.stringify(peliculas))
    console.log("Entro funcion guardar pelicula");
    mostrarPeliculas();
}

function borrarTodo() {
    console.log("Entro a brorar todo");
    localStorage.clear();
    peliculas = [];
    mostrarPeliculas();
    alert("Se borrraron las peliculas");
}

function editarPelicula(index) {
    console.log("Entro editar pelicula:" + index);
    let peliculaAEditar = peliculas[index];
    console.log(peliculaAEditar, "peliculaAEditar");
    inputTitulo.value = peliculaAEditar.titulo;
    inputEstreno.value = peliculaAEditar.estreno;
    inputGenero.value = peliculaAEditar.genero;
    inputImagen.value = peliculaAEditar.imagen;
    inputSinopsis.value = peliculaAEditar.sinopsis;
    indexEditar = index;
    // Reto: separa la funcionalidad de llenar el formulario a una funcion individual como lo hicimos con la de limpiarFormularioPeliculas
}

function eliminarPelicula(index) {
    console.log("Entro elimnar pelicula:" + index);
    peliculas.splice(index, 1);
    localStorage.setItem("peliculas",JSON.stringify(peliculas));
    mostrarPeliculas();
}

function mostrarPeliculas() {
    if (peliculas.length === 0) {
        divPeliculas.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinPeliculas">
            No hay peliculas agregadas
        </div>`;
    } else {
        divPeliculas.innerHTML = "";
        peliculas.forEach((pelicula, index) => {
            divPeliculas.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${pelicula.imagen}" class="img-fluid rounded-start" alt="pelicula">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${pelicula.estreno} - ${pelicula.genero}</h6>
                            <p class="card-text">${pelicula.sinopsis}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarPelicula(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarPelicula(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function limpiarFormularioPeliculas() {
    inputTitulo.value = "";
    inputEstreno.value = "";
    inputGenero.value = "";
    inputImagen.value = "";
    inputSinopsis.value = "";
}


btnAgregar.addEventListener("click", guardarPelicula);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarPeliculas(); 