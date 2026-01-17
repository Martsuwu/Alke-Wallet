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

    const recipientNameInput = document.getElementById("recipientName");
    const recipientEmailInput = document.getElementById("recipientEmail");
    const amountInput = document.getElementById("amount");
    const transferBtn = document.getElementById("transferBtn");
    const msg = document.getElementById("msg");
    const balanceAvailable = document.getElementById("balanceAvailable");
    const contactSuggestions = document.getElementById("contactSuggestions");

    // ============================
    // AUTOCOMPLETAR CONTACTOS
    // ============================

    // Mostrar sugerencias de contactos
    $(recipientNameInput).on("input", function() {
        const valor = $(this).val().toLowerCase();
        
        if (valor.length === 0) {
            $(contactSuggestions).hide();
            return;
        }

        const contactosFiltrados = user.contacts.filter(contact => 
            contact.name.toLowerCase().includes(valor)
        );

        if (contactosFiltrados.length === 0) {
            $(contactSuggestions).hide();
            return;
        }

        // Mostrar sugerencias
        contactSuggestions.innerHTML = contactosFiltrados.map(contact => `
            <button type="button" class="list-group-item list-group-item-action" 
                    style="text-align: left; cursor: pointer; background: #2a2a2a; color: #fff; border: none; margin-bottom: 3px;">
                <strong>${contact.name}</strong>
                <br>
                <small class="text-muted">${contact.email}</small>
            </button>
        `).join("");

        $(contactSuggestions).show();

        // Manejar click en sugerencias
        $(contactSuggestions).find("button").on("click", function(e) {
            e.preventDefault();
            const nombre = $(this).find("strong").text();
            const email = $(this).find("small").text();
            
            $(recipientNameInput).val(nombre).addClass("is-valid");
            $(recipientEmailInput).val(email).addClass("is-valid");
            $(contactSuggestions).hide();
            
            // Animar campos completados
            animarEntrada($(recipientNameInput));
            animarEntrada($(recipientEmailInput));
        });
    });

    // Ocultar sugerencias al clickear fuera
    $(document).on("click", function(e) {
        if (!$(e.target).closest("#recipientName, #contactSuggestions").length) {
            $(contactSuggestions).hide();
        }
    });

    // ============================
    // MOSTRAR SALDO DISPONIBLE
    // ============================

    balanceAvailable.textContent = user.balance.toLocaleString();

    // Animar saldo cuando cambia el monto
    $(amountInput).on("input", function() {
        const monto = parseFloat($(this).val()) || 0;
        const saldoRestante = user.balance - monto;
        
        if (monto > 0 && saldoRestante >= 0) {
            animarSaldo("balanceAvailable");
        }
    });

    // ============================
    // TRANSFERENCIA CON JQUERY
    // ============================

    $(transferBtn).on("click", function() {
        const recipientName = $(recipientNameInput).val().trim();
        const recipientEmail = $(recipientEmailInput).val().trim();
        const amount = Number($(amountInput).val());

        // Validaciones con animación
        if (!validarNombre(recipientName)) {
            $(recipientNameInput).mostrarError("Ingresa el nombre del destinatario");
            animarEntrada($(recipientNameInput));
            return;
        }

        if (!validarEmail(recipientEmail)) {
            $(recipientEmailInput).mostrarError("Ingresa un correo válido");
            animarEntrada($(recipientEmailInput));
            return;
        }

        if (!validarMonto(amount)) {
            $(amountInput).mostrarError("Monto inválido");
            animarEntrada($(amountInput));
            return;
        }

        if (amount > user.balance) {
            mostrarMensaje("msg", `Saldo insuficiente. Tu saldo es: $${user.balance.toLocaleString()}`, "danger");
            animarMensaje("msg", "error");
            return;
        }

        // Deshabilitar botón durante la transacción
        $(transferBtn).prop("disabled", true);

        // Realizar transferencia
        user.balance -= amount;
        user = agregarAlHistorial(user, "Transferencia", amount, {
            recipient: recipientName,
            recipientEmail
        });

        // Guardar cambios
        guardarUsuario(user);

        // Animar actualización de saldo
        const nuevoSaldo = user.balance.toLocaleString();
        $(balanceAvailable).fadeOut(200, function() {
            $(this).text(nuevoSaldo).fadeIn(200);
        });

        mostrarMensaje("msg", `✓ Transferencia de $${amount.toLocaleString()} a ${recipientName} realizada`, "success");
        animarMensaje("msg", "success");
        animarBoton("transferBtn");

        // Limpiar campos y actualizar saldo
        limpiarFormulario(recipientNameInput, recipientEmailInput, amountInput);
        $(recipientNameInput).limpiarValidacion();
        $(recipientEmailInput).limpiarValidacion();
        $(amountInput).limpiarValidacion();

        // Redirigir con animación
        setTimeout(() => {
            $("body").addClass("animate__animated animate__fadeOut");
            redirigir("menu.html", 300);
        }, 1500);
    });
});
