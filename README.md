#  Mi Tienda - Fullstack E-Commerce 

Proyecto final para el modulo de DWES. Se trata de una plataforma de comercio electrónico completa que implementa una arquitectura desacoplada (Frontend en Angular y Backend en Spring Boot) con  enfoque  en la robustez y la ciberseguridad.

## Stack Tecnológico

### Frontend (Angular)
- **Framework:** Angular 17+ (Componentes no standalone vinculados mediante `AppModule`).
- **UI & Estilos:** Angular Material (Cards, SnackBar, FormFields, Dialogs).
- **Comunicación:** Inyección de `HttpClient` para consumo de APIs REST.
- **Seguridad:** Implementación de `HttpInterceptorFn` para gestión de tokens y errores.

### Backend (Java Spring Boot)
- **Seguridad:** Spring Security con autenticación basada en JWT (JSON Web Tokens).
- **Persistencia:** Base de Datos SQL (MySQL/PostgreSQL).
- **API:** Arquitectura RESTful con controladores protegidos por roles (`ADMIN` / `USER`).

---

##  Arquitectura de Ciberseguridad 

El corazón de este proyecto es su sistema de protección contra intrusos y gestión de sesiones:

1. **JWT AuthInterceptor:** Todas las peticiones al Backend son interceptadas para inyectar automáticamente la cabecera `Authorization: Bearer <token>`. Se ha programado una lógica de exclusión para evitar los problemas  con la API externa de DummyJSON y las rutas de login.
2. **ErrorInterceptor (Tampering Prevention):** Un vigilante activo que captura respuestas `401 Unauthorized` o `403 Forbidden`. Si un usuario manipula manualmente su token en el LocalStorage, el interceptor detecta la invalidez, limpia los datos sensibles y redirige al usuario al Login de forma segura.
3. **Role-Based Access Control (RBAC):** El sistema diferencia entre administradores y usuarios finales. El rol se valida tanto en el Frontend (ocultando botones de edición/borrado) como en el Backend (protegiendo los endpoints `DELETE` y `POST`).

---

##  Ejecución del  Despliegue con Docker 

Para garantizar que el proyecto funcione en cualquier equipo sin necesidad de configurar bases de datos o entornos de ejecución, se ha implementado Docker Compose.

### Instrucciones de ejecución:
1. Asegúrate de tener Docker Desktop instalado y corriendo.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta el comando:
   ```bash
   docker-compose up --build
---

##  Demo de Seguridad (Para la defensa)

Para demostrar el funcionamiento del sistema de seguridad :
1. Acceder al Dashboard con un usuario legítimo.
2. Abrir herramientas de desarrollador (F12) -> **Application** -> **Local Storage**.
3. Cambiar el valor de `token_tienda` por cualquier palabra para cambiar el token.
4. Intentar realizar una acción (ej. pulsar el botón de "Probar Seguridad").
5. Resultado esperado: El `ErrorInterceptor` captura el fallo de autenticación del servidor, muestra un `MatSnackBar` informando de la sesión caducada y expulsa al usuario al `/login`.



Guía de Funcionamiento y Arquitectura Técnica
Este proyecto implementa una arquitectura Full-Stack moderna, separando la lógica de negocio en un backend robusto con Spring Boot y una interfaz reactiva con Angular 17+. A continuación se detalla el flujo operativo y los conceptos técnicos aplicados.

1. Sistema de Autenticación y Autorización (JWT & RBAC)
La seguridad es el pilar central de la aplicación. Se ha implementado un sistema de Control de Acceso Basado en Roles (RBAC):

Registro y Persistencia: Al registrar un usuario, la contraseña se gestiona mediante un PasswordEncoder. En el login, el servidor genera un JSON Web Token (JWT) firmado con un algoritmo HMAC256.

Gestión de Sesión (Frontend): El AuthService captura el token y el rol (ADMIN o ROLE_USER) y los persiste en el LocalStorage. Esto permite la rehidratación de la sesión incluso tras un refresco de página.

Seguridad por Interceptación: Se han desplegado dos interceptores funcionales:

AuthInterceptor: Inyecta automáticamente el token en la cabecera Authorization: Bearer <token> de cada petición HTTP dirigida a nuestra API local.

ErrorInterceptor: Monitoriza las respuestas del servidor. Si detecta un error 401 Unauthorized o 403 Forbidden, invalida el token local y redirige al usuario al Login automáticamente.

2. Arquitectura de Datos y Patrón Proxy
La aplicación consume datos de la API externa DummyJSON, pero no lo hace de forma directa para las operaciones críticas:

Proxy en Backend: El servidor Spring Boot actúa como un "pasarela" (Proxy). Esto permite centralizar las peticiones y aplicar reglas de seguridad de servidor antes de que los datos lleguen al cliente.

Consumo Asíncrono: Los componentes de Angular consumen estos datos a través de Observables, lo que garantiza una interfaz no bloqueante y una experiencia de usuario fluida.

 3. Lógica de Negocio en el Frontend
Gestión de Estado (Carrito): Se utiliza un servicio con patrón Singleton (CartService) para mantener el estado del carrito de compras de forma global, permitiendo que componentes independientes (Navbar y Dashboard) compartan información en tiempo real.

Protección de Vistas:

Guards: El acceso a la ruta /dashboard está restringido por un authGuard que verifica la existencia del token.

Directivas Estructurales (*ngIf): La interfaz se adapta dinámicamente. El panel de administración (botones de edición y borrado) solo se renderiza en el DOM si el servicio detecta el rol ADMIN en el token decodificado.

 4. Flujo de Usuario Estándar
Acceso: El usuario aterriza en la ruta raíz y es redirigido al /login mediante el sistema de rutas dinámicas.

Validación: Tras el éxito del login, el AuthGuard permite el acceso al /dashboard.

Interacción: El usuario puede explorar el catálogo, añadir productos al carrito (gestión reactiva) o, si posee privilegios de administrador, acceder al CRUD de productos.

Cierre: El Logout limpia el almacenamiento volátil y persistente, garantizando que no queden rastros del JWT en el cliente.

---
 Credenciales de Acceso (Testing)Para facilitar la evaluación de las diferentes funcionalidades y niveles de acceso, se han habilitado las siguientes cuentas de prueba: Para admin :admin@tienda.com , para usario normal usar el procesp de creacion de una cuenta corriente.

##  Autor
- **Marcos García -Oliva Rubio** .


