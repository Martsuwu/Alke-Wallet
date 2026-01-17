document.addEventListener("DOMContentLoaded", () => {

    if (!protegerAcceso()) return;

    const user = obtenerUsuario();
    if (!user) return;

    inicializarBalance(user);
    inicializarHistorial(user);
    guardarUsuario(user);

    const recipientNameInput = document.getElementById("recipientName");
    const recipientEmailInput = document.getElementById("recipientEmail");
    const amountInput = document.getElementById("amount");
    const transferBtn = document.getElementById("transferBtn");
    const msg = document.getElementById("msg");
    const balanceAvailable = document.getElementById("balanceAvailable");

    // Mostrar saldo disponible
    balanceAvailable.textContent = user.balance.toLocaleString();

    transferBtn.addEventListener("click", () => {
        const recipientName = recipientNameInput.value.trim();
        const recipientEmail = recipientEmailInput.value.trim();
        const amount = Number(amountInput.value);

        // Validaciones
        if (!validarNombre(recipientName)) {
            mostrarMensaje("msg", "Ingresa el nombre del destinatario", "danger");
            return;
        }

        if (!validarEmail(recipientEmail)) {
            mostrarMensaje("msg", "Ingresa un correo válido", "danger");
            return;
        }

        if (!validarMonto(amount)) {
            mostrarMensaje("msg", "Monto inválido", "danger");
            return;
        }

        if (amount > user.balance) {
            mostrarMensaje("msg", `Saldo insuficiente. Tu saldo es: $${user.balance.toLocaleString()}`, "danger");
            return;
        }

        // Realizar transferencia
        user.balance -= amount;
        user = agregarAlHistorial(user, "Transferencia", amount, {
            recipient: recipientName,
            recipientEmail
        });

        // Guardar cambios
        guardarUsuario(user);

        mostrarMensaje("msg", `✓ Transferencia de $${amount.toLocaleString()} a ${recipientName} realizada`, "success");

        // Limpiar campos y actualizar saldo
        limpiarFormulario(recipientNameInput, recipientEmailInput, amountInput);
        balanceAvailable.textContent = user.balance.toLocaleString();

        // Redirigir a menú
        redirigir("menu.html", 1500);
    });
});
});
