document.addEventListener("DOMContentLoaded", () => {

    //  Proteger acceso
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    //  Obtener usuario
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    /* =========================
       DATOS PERSONALES
    ========================= */

    // Navbar
    if (document.getElementById("navUser")) {
        document.getElementById("navUser").textContent = user.email;
    }

    // Panel datos personales
    if (document.getElementById("userName")) {
        document.getElementById("userName").textContent = user.name;
    }

    if (document.getElementById("userEmail")) {
        document.getElementById("userEmail").textContent = user.email;
    }

    /* =========================
       SALDO
    ========================= */

    // Inicializar saldo si no existe
    if (user.balance === undefined) {
        user.balance = 100000;
        localStorage.setItem("user", JSON.stringify(user));
    }

    document.getElementById("balance").textContent = user.balance;

    /* =========================
       HISTORIAL
    ========================= */

    if (!user.history) {
        user.history = [];
        localStorage.setItem("user", JSON.stringify(user));
    }

    const historyBtn = document.getElementById("historyBtn");
    if (historyBtn) {
        historyBtn.addEventListener("click", () => {
            alert("Aquí se mostrará el historial completo de movimientos");
        });
    }

    /* =========================
       CONTACTOS
    ========================= */

    // Inicializar contactos si no existen
    if (!user.contacts) {
        user.contacts = [];
        localStorage.setItem("user", JSON.stringify(user));
    }

    const addContactBtn = document.getElementById("addContactBtn");
    const contactsList = document.getElementById("contactsList");

    renderContacts();

    if (addContactBtn) {
        addContactBtn.addEventListener("click", () => {

            const name = prompt("Ingrese el nombre del contacto:");
            if (!name) return;

            const email = prompt("Ingrese el correo del contacto:");
            if (!email) return;

            user.contacts.push({ name, email });
            localStorage.setItem("user", JSON.stringify(user));

            renderContacts();
        });
    }

    function renderContacts() {
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

    /* =========================
       CERRAR SESIÓN
    ========================= */

    const logoutButtons = document.querySelectorAll("#logoutBtn");
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    });

});
