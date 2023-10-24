document.addEventListener("DOMContentLoaded", function () {
    // Escuchar el clic en el botón "Agregar Juego" del modal
    document.getElementById("agregarJuego").addEventListener("click", function () {
        // Obtener los valores ingresados en el modal
        const imagenInput = document.getElementById("imagen");
        const nombre = document.getElementById("nombreJuego").value;
        const descripcion = document.getElementById("descripcionJuego").value;
        const tematica = document.getElementById("tematica").value;
        const valor = document.getElementById("valor").value;
        const puntos = document.getElementById("puntos").value;

        // Verificar si se ha seleccionado un archivo
        if (imagenInput.files.length > 0) {
            const imagen = URL.createObjectURL(imagenInput.files[0]); // Obtener la URL de la imagen seleccionada
            // Crear un nuevo elemento de juego
            const nuevoJuego = document.createElement("div");
            nuevoJuego.className = "col-sm-12 col-md-6 col-lg-4 card";
            nuevoJuego.innerHTML = `
          <img src="${imagen}" class="card-img-top img-producto mx-auto w-50" alt="${nombre}" />
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${descripcion}</p>
            <p class="card-text">Tematica: ${tematica}</p>
            <p class="card-text">Puntos de Fidelización: ${puntos}</p>
            <p class="card-text"><strong>$${valor}</strong></p>
            <a class="btn btn-outline-success fw-bold" data-bs-toggle="modal" data-bs-target="#modal-add">Comprar</a>
            <button class="btn btn-outline-danger fw-bold" onclick="eliminarJuego(this)">Eliminar</button>
          </div>
        `;

            // Insertar el nuevo juego en la lista de juegos
            const listaJuegos = document.querySelector(".col-8 .row");
            listaJuegos.appendChild(nuevoJuego);
            alert("Juego Agregado Exitosamente");

            // Limpiar los campos del modal
            imagenInput.value = ""; // Limpiar el campo de imagen
            document.getElementById("nombreJuego").value = "";
            document.getElementById("descripcionJuego").value = "";
            document.getElementById("tematica").value = "";
            document.getElementById("valor").value = "";
            document.getElementById("puntos").value = "";

            // Cerrar el modal
            const modal = new bootstrap.Modal(document.getElementById("modal-addGame"));
            modal.hide();
        } else {
            alert("Por favor, seleccione una imagen para el juego.");
        }
    });
});

function eliminarJuego(button) {
    const juegoCard = button.closest(".card");
    const listaJuegos = document.querySelector(".col-8 .row");
    listaJuegos.removeChild(juegoCard);
}
