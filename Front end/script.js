document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("input");
    const input = document.getElementById("pregunta");
    const resultado = document.getElementById("resultado");
    const boton = document.getElementById("boton");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Previene el envío por defecto del formulario
    });

    boton.addEventListener("click", async (e) => {
        e.preventDefault();

        const pregunta = input.value.trim();
        if (!pregunta) {
            resultado.textContent = "Por favor escribe una pregunta.";
            return;
        }

        resultado.textContent = "Pensando...";

        
        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pregunta })
            });

            if (!response.ok) {
                throw new Error("Error del servidor: " + response.status);
            }

            const data = await response.json();

            if (!data.respuesta) {
                resultado.textContent = "No se recibió una respuesta válida.";
            } else {
                resultado.textContent = data.respuesta;
            }
        } catch (error) {
            console.error(error);
            resultado.textContent = "Ocurrió un error: " + error.message;
        }
    });
});