#  Mi Tienda - Fullstack E-Commerce B2C

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

Para garantizar que el proyecto funcione en cualquier equipo sin necesidad de configurar bases de datos o entornos de ejecución, se ha implementado **Docker Compose**.

### Instrucciones de ejecución:
1. Asegúrate de tener **Docker Desktop** instalado y corriendo.
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
5. **Resultado esperado:** El `ErrorInterceptor` captura el fallo de autenticación del servidor, muestra un `MatSnackBar` informando de la sesión caducada y expulsa al usuario al `/login`.

---

##  Autor
- **Marcos García -Oliva Rubio** .


