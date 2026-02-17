package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Vital para el Login (Check 4)
    Optional<User> findByEmail(String email);

    // Vital para el Registro (Check 1) si queremos comprobar que el nombre no existe
    Optional<User> findByUsername(String username);
}