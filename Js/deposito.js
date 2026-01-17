document.addEventListener("DOMContentLoaded", () => {
    
    if (!protegerAcceso()) return;

    const user = obtenerUsuario();
    if (!user) return;

    inicializarBalance(user);
    inicializarHistorial(user);
    guardarUsuario(user);

    const operationType = document.getElementById("operationType");
    const amountInput = document.getElementById("amount");
    const actionBtn = document.getElementById("actionBtn");
    const msg = document.getElementById("msg");

    actionBtn.addEventListener("click", () => {
        const type = operationType.value;
        const amount = Number(amountInput.value);

        // Validaciones
        if (!validarOperacion(type)) {
            mostrarMensaje("msg", "Seleccione una operación", "danger");
            return;
        }

        if (!validarMonto(amount)) {
            mostrarMensaje("msg", "Monto inválido", "danger");
            return;
        }

        // Procesar depósito
        if (type === "deposit") {
            user.balance += amount;
            user = agregarAlHistorial(user, "Depósito", amount);
        }

        // Procesar retiro
        if (type === "withdraw") {
            if (amount > user.balance) {
                mostrarMensaje("msg", "Saldo insuficiente", "danger");
                return;
            }
            user.balance -= amount;
            user = agregarAlHistorial(user, "Retiro", amount);
        }

        // Guardar cambios
        guardarUsuario(user);

        mostrarMensaje("msg", "Operación exitosa", "success");
        limpiarFormulario(operationType, amountInput);

        // Redirigir
        redirigir("menu.html", 500);
    });
});
