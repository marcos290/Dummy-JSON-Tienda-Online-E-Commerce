package com.example.backend.service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService; // <-- Importamos nuestra fábrica
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService; // <-- 1. Inyectamos nuestro nuevo servicio

    public AuthResponse register(AuthRequest request) {

        // El mapeo y guardado se quedan exactamente igual
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        // 2. Genero el Token de verdad usando el usuario que acabamos de crear
        var jwtToken = jwtService.generateToken(user);

        // 3. Devuelvo  la cajita (DTO) con el token real
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthResponse login(AuthRequest request) {
        // Busco al usuario en la base de datos por el email que llega del frontend
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Comparo la contraseña en texto plano que llega con la que está encriptada en la BD
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            // Si coinciden, genero el token JWT para este usuario
            var jwtToken = jwtService.generateToken(user);

            // Devuelvo el DTO con el token generado
            return AuthResponse.builder()
                    .token(jwtToken)
                    .build();
        } else {
            // Si no coinciden, lanzo un error de credenciales
            throw new RuntimeException("Contraseña incorrecta");
        }
    }
}