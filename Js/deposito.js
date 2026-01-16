document.addEventListener("DOMContentLoaded", () => {

    // 🔒 Seguridad
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Inicializar historial si no existe
    if (!user.history) {
        user.history = [];
    }

    const depositBtn = document.getElementById("depositBtn");
    const amountInput = document.getElementById("depositAmount");
    const msg = document.getElementById("depositMsg");

    depositBtn.addEventListener("click", () => {
        const amount = Number(amountInput.value);

        // Validaciones
        if (isNaN(amount) || amount <= 0) {
            msg.innerHTML = `<span class="text-danger">Ingrese un monto válido</span>`;
            return;
        }

        // Actualizar saldo
        user.balance += amount;

        // Registrar historial
        user.history.push({
            type: "Depósito",
            amount: amount,
            date: new Date().toLocaleString()
        });

        // Guardar cambios
        localStorage.setItem("user", JSON.stringify(user));

        // Feedback
        msg.innerHTML = `<span class="text-success">Depósito realizado con éxito</span>`;
        amountInput.value = "";
    });

});
