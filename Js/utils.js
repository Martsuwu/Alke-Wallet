// ============================
// FUNCIONES DE SEGURIDAD
// ============================

function protegerAcceso() {
    if (localStorage.getItem("loggedIn") !== "true") {
        location.assign("index.html");
        return false;
    }
    return true;
}

// ============================
// FUNCIONES DE USUARIO
// ============================

function obtenerUsuario() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        location.assign("index.html");
        return null;
    }
    return user;
}

function guardarUsuario(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function inicializarBalance(user) {
    if (!("balance" in user)) {
        user.balance = 100000;
    }
    return user;
}

function inicializarHistorial(user) {
    if (!user.history) {
        user.history = [];
    }
    return user;
}

function actualizarBalance(elementId) {
    const usuario = obtenerUsuario();
    if (usuario && usuario.balance !== undefined) {
        const elemento = document.getElementById(elementId);
        if (elemento) {
            elemento.textContent = usuario.balance.toLocaleString();
        }
    }
}

// ============================
// VALIDACIONES
// ============================

function validarEmail(email) {
    return email.includes("@") && email.trim().length > 0;
}

function validarMonto(monto) {
    return !isNaN(monto) && monto > 0;
}

function validarNombre(nombre) {
    return nombre.trim().length > 0;
}

function validarOperacion(operacion) {
    return operacion && (operacion === "deposit" || operacion === "withdraw");
}

// ============================
// FUNCIONES DE TRANSACCIONES
// ============================

function agregarAlHistorial(user, tipo, monto, detalles = {}) {
    if (!user.history) user.history = [];
    
    const transaccion = {
        type: tipo,
        amount: monto,
        date: new Date().toLocaleString(),
        ...detalles
    };
    
    user.history.push(transaccion);
    return user;
}

// ============================
// FUNCIONES DE UI
// ============================

function mostrarMensaje(elementId, mensaje, tipo = "danger") {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.innerHTML = `<span class="text-${tipo}">${mensaje}</span>`;
    }
}

function redirigir(pagina, tiempo = 0) {
    setTimeout(() => {
        location.assign(pagina);
    }, tiempo);
}

function limpiarFormulario(...elementos) {
    elementos.forEach(elemento => {
        if (elemento) elemento.value = "";
    });
}
