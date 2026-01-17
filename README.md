# 🏦 Alke Wallet

Una aplicación web de billetera digital que permite a los usuarios gestionar sus fondos de manera segura y eficiente.

## ✨ Características

- **Autenticación**: Registro e inicio de sesión de usuarios
- **Gestión de Saldo**: Depósitos, retiros y transferencias
- **Historial de Transacciones**: Registro detallado de todos los movimientos
- **Contactos**: Guarda tus contactos frecuentes
- **Interfaz Intuitiva**: Diseño moderno y responsivo

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, Bootstrap 5
- **JavaScript**: Vanilla JS (ES6+)
- **Almacenamiento**: LocalStorage
- **Control de Versiones**: Git

## 📁 Estructura del Proyecto

```
Alke-Wallet/
├── index.html              # Página de inicio/login
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
│   ├── deposito.js         # Lógica de depósitos/retiros
│   ├── sendmoney.js        # Lógica de transferencias
│   ├── transactions.js     # Lógica del historial
│   └── register.js         # Lógica de registro
└── README.md              # Este archivo
```

## 🔧 Funciones de Utilidad (utils.js)

### Seguridad
- `protegerAcceso()` - Verifica autenticación del usuario
- `obtenerUsuario()` - Obtiene datos del usuario desde LocalStorage
- `guardarUsuario(user)` - Guarda datos del usuario

### Validaciones
- `validarEmail(email)` - Valida formato de email
- `validarMonto(monto)` - Valida que el monto sea válido
- `validarNombre(nombre)` - Valida que el nombre no esté vacío
- `validarOperacion(operacion)` - Valida tipo de operación

### Transacciones
- `agregarAlHistorial(user, tipo, monto, detalles)` - Registra una transacción

### Interfaz
- `mostrarMensaje(elementId, mensaje, tipo)` - Muestra mensajes al usuario
- `redirigir(pagina, tiempo)` - Redirige a otra página
- `actualizarBalance(elementId)` - Actualiza el saldo mostrado

## 💰 Operaciones Disponibles

### Depósito/Retiro
- Depositar dinero a tu cuenta
- Retirar dinero de tu cuenta
- Validación de saldo

### Transferencias
- Transferir dinero a otros usuarios
- Verificación de destinatario
- Límites de saldo

### Historial
- Ver todas tus transacciones
- Filtrar por tipo de movimiento
- Detalles de fecha y hora

## 🎨 Estilos CSS Personalizados

### Variables de Color
```css
--primary: #007bff (Azul)
--success: #28a745 (Verde)
--danger: #dc3545 (Rojo)
--warning: #ffc107 (Amarillo)
```

### Componentes
- `.transaction-item` - Estilos para elementos de transacción
- `.wallet-panel` - Panel principal de la billetera
- `.wallet-box` - Cajas de contenido
- `.wallet-clickable` - Elementos interactivos

## 📝 Ejemplos de Uso

### Registrarse
1. Abre `index.html`
2. Completa el formulario de registro
3. Accede con tus credenciales

### Realizar un Depósito
1. Ve a "Realizar depósito" desde el menú
2. Selecciona "Depositar dinero"
3. Ingresa el monto
4. Confirma la operación

### Hacer una Transferencia
1. Ve a "Transferencia" desde el menú
2. Ingresa datos del destinatario
3. Especifica el monto
4. Confirma la operación

### Ver Historial
1. Haz clic en "Historial de movimientos"
2. Ver todas tus transacciones ordenadas por fecha

## 🔒 Seguridad

- ⚠️ **Nota**: Este proyecto usa LocalStorage para demostración. En producción, usar una base de datos real.
- Validaciones en cliente y servidor
- Protección contra operaciones no autorizadas

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Martsuwu/Alke-Wallet.git
```

2. Navega al directorio:
```bash
cd Alke-Wallet
```

3. Abre con un servidor local (recomendado):
```bash
python -m http.server 8000
# O con Node.js
npx http-server
```

4. Accede en tu navegador:
```
http://localhost:8000
```

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión local o en línea

## 🐛 Solución de Problemas

**El saldo no se actualiza:**
- Verifica que LocalStorage esté habilitado en tu navegador
- Limpia el caché del navegador

**Los scripts no cargan:**
- Verifica las rutas en los HTML
- Usa el servidor local en lugar de abrir el archivo directamente

**Los datos se pierden:**
- Los datos se guardan en LocalStorage del navegador
- Se perderán si limpias los datos del navegador

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver el archivo LICENSE para más detalles.

## 👤 Autor

**Martín** - [@Martsuwu](https://github.com/Martsuwu)

## 📞 Soporte

Para soporte, abre un issue en el repositorio de GitHub.

---

Hecho con ❤️ por Martín
