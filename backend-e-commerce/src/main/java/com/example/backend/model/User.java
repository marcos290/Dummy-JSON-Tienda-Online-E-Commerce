package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ENTIDAD: User
 * Esta clase define la estructura de la tabla "USERS" en la base de datos SQL.
 * Es la pieza central para la autenticación y el control de acceso (RBAC).
 */
@Data // Genera automáticamente Getters, Setters y métodos de utilidad (Lombok).
@Builder // Permite construir usuarios de forma fluida en la lógica de registro.
@NoArgsConstructor // Constructor por defecto requerido por JPA.
@AllArgsConstructor // Constructor completo para inicialización de datos.
@Entity // Marca la clase como una entidad gestionada por el ORM Hibernate.
@Table(name = "USERS") // Mapeo a la tabla física "USERS" en el motor de base de datos.
public class User {

    /**
     * Identificador único autoincremental gestionado por la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre de usuario único.
     * Constraint 'unique = true' evita duplicados a nivel de base de datos (Check 1).
     * 'nullable = false' asegura que el campo sea obligatorio.
     */
    @Column(nullable = false, unique = true)
    private String username;

    /**
     * Email del usuario, utilizado como identificador principal en el Login (Check 4).
     * Se marca como 'unique' para garantizar que no existan dos cuentas con el mismo correo.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * Credencial de acceso.
     * NOTA DE CIBERSEGURIDAD: Aunque aquí se define como String, en la base de datos
     * nunca se almacena texto plano, sino el HASH generado mediante BCrypt.
     */
    @Column(nullable = false)
    private String password;

    /**
     * Rol asignado al usuario (ej. 'ADMIN' o 'USER').
     * Este campo es fundamental para el Check 10 (RoleGuard), permitiendo
     * restringir el acceso a funcionalidades sensibles del sistema.
     */
    @Column(nullable = false)
    private String role;
}