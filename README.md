# 🏦 Alke Wallet

Una aplicación web de billetera digital que permite a los usuarios gestionar sus fondos de manera segura y eficiente.

 Características

- Autenticación: Registro e inicio de sesión de usuarios
- Gestión de Saldo: Depósitos, retiros y transferencias
- Historial de Transacciones: Registro detallado de todos los movimientos
- Contactos: Guarda tus contactos frecuentes
- Interfaz Intuitiva: Diseño moderno y responsivo

 Elementos usados:

- **Frontend**: HTML5, CSS3, Bootstrap 5
- **JavaScript**: Vanilla JS (ES6+)
- **Almacenamiento**: LocalStorage
- **Control de Versiones**: Git

 Estructura del Proyecto

```
Alke-Wallet/
├── index.html              # Página de inicio y login
├── login.html              # Formulario de login
├── menu.html               # Panel principal del usuario
├── deposito.html           # Depósitos y retiros
├── sendmoney.html          # Transferencias
├── transactions.html       # Historial de transacciones
├── CSS/
│   ├── styles.css          # Estilos principales
│   └── global.css          # Estilos globales y utilidades
├── Js/
│   ├── utils.js            # Funciones reutilizables
│   ├── login.js            # Lógica de autenticación
│   ├── menu.js             # Lógica del menú principal
│   ├── deposito.js         # Lógica de depósitos y retiros
│   ├── sendmoney.js        # Lógica de transferencias
│   ├── transactions.js     # Lógica del historial
│   └── register.js         # Lógica de registro
└── README.md              # Este archivo
```

Funciones de Utilidad (utils.js)

Seguridad
- `protegerAcceso()` - Autenticación del usuario
- `obtenerUsuario()` - Obtiene datos del usuario desde LocalStorage
- `guardarUsuario(user)` - Guarda datos del usuario

 Validaciones
- `validarEmail(email)` - Valida formato de email
- `validarMonto(monto)` - Valida que el monto sea válido
- `validarNombre(nombre)` - Valida que el nombre no esté vacío
- `validarOperacion(operacion)` - Valida tipo de operación

 Transacciones
- `agregarAlHistorial(user, tipo, monto, detalles)` - Registra una transacción

 Interfaz
- `mostrarMensaje(elementId, mensaje, tipo)` - Muestra mensajes al usuario
- `redirigir(pagina, tiempo)` - Redirige a otra página
- `actualizarBalance(elementId)` - Actualiza el saldo mostrado

 Operaciones Disponibles

 Depósito y Retiro
- Depositar dinero a tu cuenta
- Retirar dinero de tu cuenta
- Validación de saldo

Transferencias
- Transferir dinero a otros usuarios
- Verificación de destinatario
- Límites de saldo

Historial
- Ver todas tus transacciones
- Filtrar por tipo de movimiento
- Detalles de fecha y hora

Componentes:
- `.transaction-item` - Estilos para elementos de transacción
- `.wallet-panel` - Panel principal de la billetera
- `.wallet-box` - Cajas de contenido
- `.wallet-clickable` - Elementos interactivos

Ejemplos de Uso:

Registrarse
1. Abre `index.html`
2. Completa el formulario de registro
3. Accede con tus credenciales

Realizar un Depósito:
1. Ve a "Realizar depósito" desde el menú
2. Selecciona "Depositar dinero"
3. Ingresa el monto
4. Confirma la operación

Hacer una Transferencia:
1. Ve a "Transferencia" desde el menú
2. Ingresa datos del destinatario
3. Especifica el monto
4. Confirma la operación

Ver Historial:
1. Haz clic en "Historial de movimientos"
2. Ver todas tus transacciones ordenadas por fecha
