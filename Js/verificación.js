document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener usuario guardado
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            errorMsg.textContent = "No existe un usuario registrado.";
            return;
        }

        const user = JSON.parse(storedUser);

        // Validar credenciales
        if (
            emailInput.value === user.email &&
            passwordInput.value === user.password
        ) {
            errorMsg.textContent = "";
            window.location.href = "menu.html";
        } else {
            errorMsg.textContent = "Correo o contraseña incorrectos.";
        }
    });
});
