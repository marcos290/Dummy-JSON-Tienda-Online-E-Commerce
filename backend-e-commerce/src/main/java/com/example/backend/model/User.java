package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Para el Check 1: Nombre de usuario
    @Column(nullable = false, unique = true)
    private String username;

    // Para el Check 4: Login por email
    @Column(nullable = false, unique = true)
    private String email;

    // Ciberseguridad: Aquí irá el hash de BCrypt
    @Column(nullable = false)
    private String password;

    // Para el Check 10: RoleGuard (ADMIN o USER)
    @Column(nullable = false)
    private String role;
}