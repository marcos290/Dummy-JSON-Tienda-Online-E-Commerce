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
}