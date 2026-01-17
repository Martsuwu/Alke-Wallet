document.addEventListener("DOMContentLoaded", () => {

    if (!protegerAcceso()) return;

    const user = obtenerUsuario();
    if (!user) return;

    inicializarBalance(user);
    inicializarHistorial(user);
    guardarUsuario(user);

    // ============================
    // DATOS PERSONALES
    // ============================

    mostrarDatosPersonales(user);

    // ============================
    // SALDO
    // ============================

    actualizarBalance("balance");
    window.addEventListener("storage", () => actualizarBalance("balance"));
    window.addEventListener("pageshow", () => actualizarBalance("balance"));

    // ============================
    // HISTORIAL
    // ============================

    const historyBtn = document.getElementById("historyBtn");
    if (historyBtn) {
        historyBtn.addEventListener("click", () => {
            redirigir("transactions.html", 0);
        });
    }

    // ============================
    // CONTACTOS
    // ============================

    if (!user.contacts) {
        user.contacts = [];
        guardarUsuario(user);
    }

    const addContactBtn = document.getElementById("addContactBtn");
    const contactsList = document.getElementById("contactsList");

    renderContacts(user, contactsList);

    if (addContactBtn) {
        addContactBtn.addEventListener("click", () => {
            const name = prompt("Ingrese el nombre del contacto:");
            if (!validarNombre(name)) return;

            const email = prompt("Ingrese el correo del contacto:");
            if (!validarEmail(email)) return;

            user.contacts.push({ name, email });
            guardarUsuario(user);
            renderContacts(user, contactsList);
        });
    }

    // ============================
    // LOGOUT
    // ============================

    const logoutButtons = document.querySelectorAll("#logoutBtn");
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            redirigir("index.html", 0);
        });
    });
});

// ============================
// FUNCIONES AUXILIARES
// ============================

function mostrarDatosPersonales(user) {
    const elementos = {
        navUser: user.email,
        userName: user.name,
        userEmail: user.email
    };

    Object.entries(elementos).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    });
}

function renderContacts(user, contactsList) {
    if (!contactsList) return;

    contactsList.innerHTML = "";

    user.contacts.forEach(contact => {
        const div = document.createElement("div");
        div.className = "wallet-box";

        div.innerHTML = `
            <strong>${contact.name}</strong>
            <p class="text-muted mb-0">${contact.email}</p>
        `;

        contactsList.appendChild(div);
    });
}
