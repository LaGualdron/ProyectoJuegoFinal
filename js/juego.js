document.addEventListener('DOMContentLoaded', (event) => {
    function abrirPantalla() {
        console.log('Abriendo pantalla...');
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        fetch('pantallaJuego.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('modalContent').innerHTML = data;
                configurarRespuestas();
            })
            .catch(error => console.error('Error al cargar la pregunta:', error));
    }

    function configurarRespuestas() {
        console.log('Configurando respuestas...');
        var respuestas = document.querySelectorAll('.respuestas');

        respuestas.forEach(function(respuesta) {
            respuesta.addEventListener('click', function() {
                console.log('Respuesta clickeada:', respuesta);
                var esCorrecta = respuesta.classList.contains('correcta');
                if (esCorrecta) {
                    mostrarImagen('imagenCorrecto');
                } else {
                    mostrarImagen('imagenIncorrecto', obtenerRespuestaCorrecta());
                }
            });
        });
    }

    function obtenerRespuestaCorrecta() {
        var correcta = document.querySelector('.respuestas.correcta p');
        return correcta ? correcta.textContent : 'N/A';
    }

    function mostrarImagen(idImagen, mensaje = '') {
        console.log('Mostrando imagen:', idImagen);
        var imagenCorrecto = document.getElementById('imagenCorrecto');
        var imagenIncorrecto = document.getElementById('imagenIncorrecto');
        var mensajeElemento = document.getElementById('mensaje');
        var siguienteBtn = document.getElementById('siguienteBtn');

        if (idImagen === 'imagenCorrecto') {
            imagenCorrecto.style.display = 'block';
            imagenIncorrecto.style.display = 'none';
            mensajeElemento.style.display = 'none';
        } else {
            imagenCorrecto.style.display = 'none';
            imagenIncorrecto.style.display = 'block';
            mensajeElemento.textContent = `INCORRECTO, la respuesta correcta es: ${mensaje}`;
            mensajeElemento.style.display = 'block';
        }

        document.getElementById('resultado').style.display = 'block';
        siguienteBtn.style.display = 'block';

        // Agregar evento al botón Siguiente Pregunta
        siguienteBtn.addEventListener('click', cargarSiguientePregunta);
    }

    let preguntaActual = 1;

    function cargarSiguientePregunta() {
        console.log('Cargando siguiente pregunta...');
        preguntaActual++;
        let siguientePregunta;

        if (preguntaActual === 2) {
            siguientePregunta = 'pantallaJuego2.html';
        } else if (preguntaActual === 3) {
            siguientePregunta = 'pantallaJuego3.html';
        } else if (preguntaActual === 4) {
            siguientePregunta = 'pantallaJuego4.html';
        } else {
            mostrarMensajeFinal();
            return;
        }

        fetch(siguientePregunta)
            .then(response => response.text())
            .then(data => {
                document.getElementById('modalContent').innerHTML = data;
                configurarRespuestas();
                document.getElementById('resultado').style.display = 'none'; // Ocultar el contenedor de resultado
            })
            .catch(error => console.error('Error al cargar la pregunta:', error));
    }

    function mostrarMensajeFinal() {
        console.log('Mostrando mensaje final...');
        document.getElementById('modalContent').innerHTML = '<h2>¡Gracias por participar!</h2>';
    }

    document.querySelector('button[type="button"]').onclick = abrirPantalla;

    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});