package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * REPOSITORIO: UserRepository
 * Capa de acceso a datos para la entidad User.
 * Gestiona todas las operaciones de persistencia sobre la tabla 'USERS'.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * MÉTODO DE CONSULTA: findByEmail
     * Es vital para el proceso de Login (Check 4).
     * @param email El correo introducido en el formulario.
     * @return Un 'Optional' que contiene al usuario si existe, evitando así el error 'NullPointerException'.
     * * Spring Data JPA traduce automáticamente este método a la consulta SQL:
     * SELECT * FROM USERS WHERE email = ?
     */
    Optional<User> findByEmail(String email);

    /**
     * MÉTODO DE CONSULTA: findByUsername
     * Vital para el proceso de Registro (Check 1).
     * @param username El nombre de usuario que se desea registrar.
     * @return El usuario si ya existe en la base de datos.
     * * Se utiliza para validar la unicidad del nombre de usuario antes de
     * completar el registro, garantizando que no haya duplicados.
     */
    Optional<User> findByUsername(String username);
}