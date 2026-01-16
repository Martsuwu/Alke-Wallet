$(document).ready(function () {

    const $email = $("#email");
    const $password = $("#password");
    const $button = $("#loginBtn");
    
    function validarFormulario() {
        const emailValido = $email.val().trim() !== "";
        const passwordValido = $password.val().length >= 4;

        if (emailValido && passwordValido) {
            $button.prop("disabled", false);
        } else {
            $button.prop("disabled", true);
        }
    }

    $email.on("input", validarFormulario);
    $password.on("input", validarFormulario);

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const email = $email.val().trim();
        const password = $password.val();

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            $("#errorMsg").text("No existe un usuario registrado");
            return;
        }

        const user = JSON.parse(storedUser);

        if (email === user.email && password === user.password) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "menu.html";
        } else {
            $("#errorMsg").text("Correo o contraseña incorrectos");
        }
    });
});