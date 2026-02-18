package com.example.backend.service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * SERVICIO DE AUTENTICACIÓN (AuthService)
 * Contiene la lógica de negocio para el registro y el inicio de sesión.
 * Coordina el repositorio, el codificador de contraseñas y el servicio JWT.
 */
@Service
@RequiredArgsConstructor // Genera el constructor para la inyección de dependencias (final fields)
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * PROCESO DE REGISTRO
     * @param request Datos del formulario de registro (email, username, password)
     * @return AuthResponse con el Token y el Rol para el Frontend
     */
    public AuthResponse register(AuthRequest request) {
        // 1. MAPEADO Y CONSTRUCCIÓN: Creamos la entidad User a partir del DTO.
        // Por política de negocio, todo nuevo registro recibe el rol "ROLE_USER" por defecto.
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                // Encriptamos la contraseña antes de guardarla (Ciberseguridad)
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();

        // 2. PERSISTENCIA: Guardamos el nuevo usuario en la base de datos SQL.
        userRepository.save(user);

        // 3. GENERACIÓN DE IDENTIDAD: Creamos el token JWT inicial.
        var jwtToken = jwtService.generateToken(user);

        // 4. RESPUESTA: Devolvemos el token y rol para que Angular inicie la sesión automáticamente.
        return AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();
    }

    /**
     * PROCESO DE LOGIN
     * @param request Credenciales introducidas por el usuario
     * @return AuthResponse si la validación es correcta
     */
    public AuthResponse login(AuthRequest request) {
        // 1. IDENTIFICACIÓN: Buscamos al usuario por su email único (Check 4).
        // Si no existe, lanzamos una excepción que el sistema capturará.
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. VERIFICACIÓN: El PasswordEncoder compara la clave recibida con la de la BD.
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            // 3. AUTORIZACIÓN: Si la clave coincide, generamos un nuevo Token JWT.
            var jwtToken = jwtService.generateToken(user);

            // 4. RESPUESTA COMPLETA: Es vital devolver el ROL.
            // Gracias a esto, Angular sabrá si debe mostrar opciones de ADMIN o de USER.
            return AuthResponse.builder()
                    .token(jwtToken)
                    .role(user.getRole())
                    .build();
        } else {
            // Si la clave no coincide, impedimos el acceso.
            throw new RuntimeException("Contraseña incorrecta");
        }
    }
}