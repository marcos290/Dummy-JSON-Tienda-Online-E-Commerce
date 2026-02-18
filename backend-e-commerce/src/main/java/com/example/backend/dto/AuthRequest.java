package com.example.backend.dto;

import lombok.*;

/**
 * DTO: AuthRequest (Data Transfer Object)
 * Esta clase se utiliza para transportar los datos de autenticación entre el cliente (Angular)
 * y el servidor (Spring Boot) de forma estructurada.
 */
@Data // Anotación de Lombok que genera automáticamente Getters, Setters, equals, canEqual, hashCode y toString.
@Builder // Permite utilizar el patrón de diseño "Builder" para crear objetos de forma más limpia y legible.
@AllArgsConstructor // Genera automáticamente un constructor con todos los campos de la clase.
@NoArgsConstructor // Genera automáticamente un constructor vacío, necesario para que frameworks como Jackson puedan deserializar el JSON.
public class AuthRequest {

    // Identificador único del usuario para el inicio de sesión y registro
    private String email;

    // Credencial de seguridad (se recibirá en texto plano y se encriptará en el servicio)
    private String password;

    // Campo opcional para el nombre de usuario durante el proceso de registro
    private String username;
}