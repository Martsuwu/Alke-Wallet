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

    // Inicializar saldo si no existe
    if (!("balance" in user)) {
        user.balance = 100000;
        localStorage.setItem("user", JSON.stringify(user));
    }

    // Función para actualizar el saldo 
    function actualizarSaldo() {
        const usuarioActual = JSON.parse(localStorage.getItem("user"));
        if (usuarioActual && usuarioActual.balance !== undefined) {
            document.getElementById("balance").textContent = usuarioActual.balance;
        }
    }

    // Mostrar saldo inicial
    actualizarSaldo();

    // Escuchar cambios en localStorage (útil si abres múltiples pestañas)
    window.addEventListener("storage", actualizarSaldo);

    // También verificar cada vez que vuelves a esta página
    window.addEventListener("pageshow", actualizarSaldo);


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
    // Logout

    const logoutButtons = document.querySelectorAll("#logoutBtn");
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    });

});
