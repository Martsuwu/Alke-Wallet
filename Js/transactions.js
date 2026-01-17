document.addEventListener("DOMContentLoaded", () => {

    if (!protegerAcceso()) return;

    const user = obtenerUsuario();
    if (!user) return;

    const transactionsList = document.getElementById("transactionsList");
    const emptyMessage = document.getElementById("emptyMessage");

    // Verificar si hay historial
    if (!user.history || user.history.length === 0) {
        emptyMessage.style.display = "block";
        transactionsList.innerHTML = "";
        return;
    }

    emptyMessage.style.display = "none";

    // Mostrar transacciones en orden inverso (más recientes primero)
    user.history.slice().reverse().forEach((transaction) => {
        const div = document.createElement("div");
        div.className = "transaction-item";

        const { icon, typeClass } = getTransactionStyle(transaction.type);
        const { amountClass, amountPrefix } = getAmountStyle(transaction.type);

        div.classList.add(typeClass);

        const detailsHTML = transaction.type === "Transferencia"
            ? `<p class="mb-1 text-muted"><small>Para: ${transaction.recipient} (${transaction.recipientEmail})</small></p>`
            : "";

        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <p class="mb-1">
                        <span style="font-size: 20px;">${icon}</span>
                        <strong>${transaction.type}</strong>
                    </p>
                    ${detailsHTML}
                    <small class="text-muted">${transaction.date}</small>
                </div>
                <div class="text-end">
                    <p class="transaction-amount ${amountClass}">
                        ${amountPrefix}${transaction.amount.toLocaleString()}
                    </p>
                </div>
            </div>
        `;

        transactionsList.appendChild(div);
    });
});

// Estilos por tipo de transacción
function getTransactionStyle(type) {
    const styles = {
        "Depósito": { icon: "📥", typeClass: "transaction-deposit" },
        "Retiro": { icon: "📤", typeClass: "transaction-withdraw" },
        "Transferencia": { icon: "💸", typeClass: "transaction-transfer" }
    };
    return styles[type] || { icon: "📊", typeClass: "" };
}

// Estilos de monto
function getAmountStyle(type) {
    if (type === "Depósito") {
        return { amountClass: "amount-positive", amountPrefix: "+ $" };
    }
    return { amountClass: "amount-negative", amountPrefix: "- $" };
}
