document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("loggedIn") !== "true") {
        location.assign("index.html");
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        location.assign("index.html");
        return;
    }

    if (!("balance" in user)) user.balance = 100000;
    if (!user.history) user.history = [];

    const operationType = document.getElementById("operationType");
    const amountInput = document.getElementById("amount");
    const actionBtn = document.getElementById("actionBtn");
    const msg = document.getElementById("msg");

    actionBtn.addEventListener("click", () => {
        const type = operationType.value;
        const amount = Number(amountInput.value);

        if (!type) {
            msg.innerHTML = `<span class="text-danger">Seleccione una operación</span>`;
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            msg.innerHTML = `<span class="text-danger">Monto inválido</span>`;
            return;
        }

        if (type === "deposit") {
            user.balance += amount;

            user.history.push({
                type: "Depósito",
                amount,
                date: new Date().toLocaleString()
            });
        }

        if (type === "withdraw") {
            if (amount > user.balance) {
                msg.innerHTML = `<span class="text-danger">Saldo insuficiente</span>`;
                return;
            }

            user.balance -= amount;

            user.history.push({
                type: "Retiro",
                amount,
                date: new Date().toLocaleString()
            });
        }

        // 🔴 ESTA LÍNEA ES CLAVE
        localStorage.setItem("user", JSON.stringify(user));

        msg.innerHTML = `<span class="text-success">Operación exitosa</span>`;

        setTimeout(() => {
            location.assign("menu.html");
        }, 500);
    });
});
