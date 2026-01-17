// ============================
// UTILIDADES JQUERY
// ============================

// Validar campos en tiempo real
$.fn.validarEnTiempoReal = function(validador) {
    return this.on("blur change", function() {
        const $input = $(this);
        const valor = $input.val().trim();
        const esValido = validador(valor);
        
        if (esValido) {
            $input.removeClass("is-invalid").addClass("is-valid");
        } else {
            $input.removeClass("is-valid").addClass("is-invalid");
        }
    });
};

// Limpiar validación
$.fn.limpiarValidacion = function() {
    return this.removeClass("is-valid is-invalid");
};

// Mostrar error
$.fn.mostrarError = function(mensaje) {
    const $elemento = $(this);
    const $feedback = $elemento.next(".invalid-feedback");
    
    if ($feedback.length) {
        $feedback.text(mensaje).show();
    } else {
        $elemento.after(`<div class="invalid-feedback" style="display: block;">${mensaje}</div>`);
    }
    
    $elemento.addClass("is-invalid");
};

// Ocultar error
$.fn.ocultarError = function() {
    const $elemento = $(this);
    $elemento.removeClass("is-invalid");
    $elemento.next(".invalid-feedback").hide();
};

// Deshabilitar/Habilitar con animación
$.fn.deshabilitarConAnimacion = function() {
    return this.fadeOut(200, function() {
        $(this).prop("disabled", true).fadeIn(200);
    });
};

$.fn.habilitarConAnimacion = function() {
    return this.fadeOut(200, function() {
        $(this).prop("disabled", false).fadeIn(200);
    });
};

// Validaciones jQuery
const validacionesJquery = {
    email: function($input) {
        return $input.validarEnTiempoReal(function(valor) {
            return valor.includes("@") && valor.length > 0;
        });
    },
    
    monto: function($input) {
        return $input.validarEnTiempoReal(function(valor) {
            return !isNaN(valor) && valor > 0;
        });
    },
    
    nombre: function($input) {
        return $input.validarEnTiempoReal(function(valor) {
            return valor.length > 0;
        });
    },
    
    requerido: function($input) {
        return $input.validarEnTiempoReal(function(valor) {
            return valor.length > 0;
        });
    }
};

// Inicializar validaciones en formularios
function inicializarValidaciones() {
    $("[data-validar]").each(function() {
        const $input = $(this);
        const tipo = $input.data("validar");
        
        if (validacionesJquery[tipo]) {
            validacionesJquery[tipo]($input);
        }
    });
}

// Animar entrada de datos
function animarEntrada($elemento) {
    $elemento.addClass("animate__animated animate__fadeInUp");
    setTimeout(() => {
        $elemento.removeClass("animate__animated animate__fadeInUp");
    }, 600);
}

// Manejo centralizado de eventos
const eventosCentralizados = {
    bindearFormulario: function(formSelector, callback) {
        $(formSelector).on("submit", function(e) {
            e.preventDefault();
            callback.call(this);
        });
    },
    
    bindearBoton: function(botonesSelector, callback) {
        $(botonesSelector).on("click", function(e) {
            e.preventDefault();
            callback.call(this);
        });
    },
    
    bindearInput: function(inputSelector, evento, callback) {
        $(inputSelector).on(evento, function() {
            callback.call(this, $(this));
        });
    }
};

// Inicializar al cargar el documento
$(document).ready(function() {
    inicializarValidaciones();
});
