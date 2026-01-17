document.addEventListener("DOMContentLoaded", () => {
    
    if (!protegerAcceso()) return;

    let user = obtenerUsuario();
    if (!user) {
        console.error("No se pudo obtener el usuario");
        return;
    }

    user = inicializarBalance(user);
    user = inicializarHistorial(user);
    guardarUsuario(user);
    console.log("Usuario cargado:", user);

    const operationType = document.getElementById("operationType");
    const amountInput = document.getElementById("amount");
    const actionBtn = document.getElementById("actionBtn");
    const msg = document.getElementById("msg");

    // ============================
    // ACTUALIZACIÓN DINÁMICA DEL SALDO
    // ============================

    // Mostrar saldo simulado al ingresar monto
    $(amountInput).on("input", function() {
        const monto = parseFloat($(this).val()) || 0;
        const tipo = $(operationType).val();
        
        if (monto > 0 && tipo) {
            let saldoSimulado = user.balance;
            
            if (tipo === "deposit") {
                saldoSimulado += monto;
            } else if (tipo === "withdraw" && monto <= user.balance) {
                saldoSimulado -= monto;
            }
            
            console.log(`Saldo simulado: $${saldoSimulado.toLocaleString()}`);
        }
    });

    // ============================
    // TRANSFERENCIA CON VALIDACIÓN
    // ============================

    $(actionBtn).on("click", function() {
        const type = $(operationType).val();
        const amount = Number($(amountInput).val());

        // Validaciones
        if (!validarOperacion(type)) {
            $(operationType).mostrarError("Seleccione una operación");
            animarEntrada($(operationType));
            return;
        }

        if (!validarMonto(amount)) {
            $(amountInput).mostrarError("Monto inválido");
            animarEntrada($(amountInput));
            return;
        }

        // Deshabilitar botón
        $(this).prop("disabled", true);

        // Procesar depósito
        if (type === "deposit") {
            user.balance += amount;
            user = agregarAlHistorial(user, "Depósito", amount);
            console.log(`✓ Depósito de $${amount.toLocaleString()} realizado`);
        }

        // Procesar retiro
        if (type === "withdraw") {
            if (amount > user.balance) {
                $(amountInput).mostrarError("Saldo insuficiente");
                animarEntrada($(amountInput));
                $(this).prop("disabled", false);
                return;
            }
            user.balance -= amount;
            user = agregarAlHistorial(user, "Retiro", amount);
            console.log(`✓ Retiro de $${amount.toLocaleString()} realizado`);
        }

        // Guardar cambios
        guardarUsuario(user);

        // Limpiar validaciones
        $(operationType).limpiarValidacion();
        $(amountInput).limpiarValidacion();

        mostrarMensaje("msg", "Operación exitosa", "success");
        animarMensaje("msg", "success");
        animarBoton("actionBtn");
        limpiarFormulario(operationType, amountInput);

        // Redirigir con animación
        setTimeout(() => {
            $("body").addClass("animate__animated animate__fadeOut");
            redirigir("menu.html", 300);
        }, 1500);
    });
});
