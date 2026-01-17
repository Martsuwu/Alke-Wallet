
// Mensaje de éxito o error
function animarMensaje(elementId, tipo = "success") {
    const $elemento = $(`#${elementId}`);
    
    $elemento.fadeIn(300);
    
    if (tipo === "success") {
        $elemento.find("span").addClass("animate__animated animate__slideInDown");
    } else {
        $elemento.find("span").addClass("animate__animated animate__shake");
    }
    
    setTimeout(() => {
        $elemento.fadeOut(300);
    }, 3000);
}

// Elementos de transacción
function animarTransaccion($elemento) {
    $elemento.hide().fadeIn(500);
    $elemento.css({
        "animation": "slideIn 0.5s ease-in-out"
    });
}

// Saldo
function animarSaldo(elementId) {
    const $elemento = $(`#${elementId}`);
    $elemento.addClass("animate__animated animate__pulse");
    
    setTimeout(() => {
        $elemento.removeClass("animate__animated animate__pulse");
    }, 1000);
}

// Botón al hacer clic
function animarBoton(buttonId) {
    const $boton = $(`#${buttonId}`);
    $boton.addClass("animate__animated animate__bounceIn");
    
    setTimeout(() => {
        $boton.removeClass("animate__animated animate__bounceIn");
    }, 600);
}

// Formulario
function animarFormulario(formId) {
    const $formulario = $(`#${formId}`);
    $formulario.find("input, select, textarea").each(function(index) {
        $(this).hide().delay(index * 100).fadeIn(300);
    });
}

// Lista de transacciones
function animarLista(contenedorId) {
    const $contenedor = $(`#${contenedorId}`);
    $contenedor.find(".transaction-item").each(function(index) {
        $(this).hide().delay(index * 150).fadeIn(400);
    });
}

// Efecto 
function efectoHoverTarjetas() {
    $(".wallet-box").hover(
        function() {
            $(this).addClass("animate__animated animate__pulse");
        },
        function() {
            $(this).removeClass("animate__animated animate__pulse");
        }
    );
}

// Carga de página
function animarCargaPagina() {
    $("body").fadeIn(300);
    $(".container").addClass("animate__animated animate__fadeInUp");
}

// Desaparición
function animarDesaparicion(elementId, callback) {
    const $elemento = $(`#${elementId}`);
    $elemento.addClass("animate__animated animate__fadeOutDown");
    
    setTimeout(() => {
        $elemento.remove();
        if (callback) callback();
    }, 500);
}

// Alerta animada
function animarAlerta(mensaje, tipo = "info") {
    const icono = tipo === "success" ? "✓" : tipo === "error" ? "✕" : "ℹ";
    const clase = `alert-${tipo === "success" ? "success" : tipo === "error" ? "danger" : "info"}`;
    
    const $alerta = $(`
        <div class="alert ${clase} animate__animated animate__slideInDown" role="alert">
            ${icono} ${mensaje}
        </div>
    `);
    
    $("body").prepend($alerta);
    
    setTimeout(() => {
        $alerta.addClass("animate__animated animate__slideOutUp");
        setTimeout(() => $alerta.remove(), 500);
    }, 3000);
}

// Inicializar animaciones al cargar la página
$(document).ready(function() {
    animarCargaPagina();
    efectoHoverTarjetas();
});
