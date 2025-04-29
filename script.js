// Inicializar el puntaje
let score = 0;
let data = [];

// Función para cargar el archivo CSV
function loadCSV() {
    fetch("provincias-capitales.csv")
        .then(response => response.text())
        .then(text => {
            const rows = text.split("\n"); // Dividir el contenido por filas
            rows.forEach(row => {
                const [provincia, capital] = row.split(";"); // Separar provincia y capital por ";"
                if (provincia && capital) {
                    data.push({ provincia: provincia.trim(), capital: capital.trim() });
                }
            });
            // Iniciar el juego después de cargar los datos
            startGameWithData(data);
        });
}

// Función para iniciar el juego con datos cargados
function startGameWithData(data) {
    const randomEntry = data[Math.floor(Math.random() * data.length)];
    document.getElementById("question").textContent = `¿Cuál es la capital de la provincia de ${randomEntry.provincia}?`;

    const options = document.getElementById("options");
    options.innerHTML = ""; // Limpiar opciones anteriores

    data.forEach(entry => {
        const button = document.createElement("button");
        button.textContent = entry.capital;

        // Acción al hacer clic en el botón
        button.onclick = () => {
            const feedback = document.getElementById("feedback");
            if (entry.capital === randomEntry.capital) {
                score++; // Incrementar puntaje si es correcto
                feedback.textContent = "¡Correcto!";
                feedback.style.color = "green";
            } else {
                feedback.textContent = "¡Incorrecto!";
                feedback.style.color = "red";
            }

            // Actualizar el puntaje correctamente
            document.getElementById("score").textContent = `Puntos: ${score}`;

            // Mostrar el mensaje por unos segundos antes de generar nueva pregunta
            setTimeout(() => {
                feedback.textContent = ""; // Limpiar el mensaje
                startGameWithData(data); // Generar nueva pregunta
            }, 1500); // Esperar 1.5 segundos
        };

        options.appendChild(button);
    });
}

// Mostrar puntaje inicial
document.getElementById("score").textContent = `Puntos: ${score}`;

// Cargar el archivo CSV al inicio
loadCSV();