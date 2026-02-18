package com.example.backend.dto;

import lombok.*;

/**
 * DTO: AuthResponse (Data Transfer Object)
 * Esta clase representa la estructura de la respuesta que el servidor envía al cliente
 * tras un proceso de autenticación (Login o Registro) exitoso.
 */
@Data // Genera automáticamente Getters, Setters y métodos auxiliares (Lombok).
@Builder // Facilita la creación de la respuesta en el AuthService de forma fluida.
@AllArgsConstructor // Constructor con todos los campos (token y role).
@NoArgsConstructor // Constructor vacío para la compatibilidad con librerías de JSON.
public class AuthResponse {

    /**
     * El Token JWT (JSON Web Token) generado por el servidor.
     * Este string contiene la identidad cifrada del usuario y será enviado
     * en cada petición HTTP posterior dentro de la cabecera 'Authorization'.
     */
    private String token;

    /**
     * El rol del usuario obtenido de la base de datos (ej. 'ADMIN', 'USER').
     * Permite al Frontend realizar una gestión de vistas basada en roles (RBAC),
     * como ocultar o mostrar botones de gestión.
     */
    private String role;
}