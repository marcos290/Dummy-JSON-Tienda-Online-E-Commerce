package com.example.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    // En un proyecto real, esto iría oculto en un archivo de entorno, pero para tu entrega nos vale perfectamente aquí.
    private static final String SECRET_KEY = "MiClaveSuperSecretaParaElEcommerceDe2DAW";
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET_KEY);

    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getEmail()) // Identificamos de quién es el token (su email)
                .withClaim("role", user.getRole()) // Guardamos su rol (ROLE_USER)
                .withIssuedAt(new Date()) // Fecha de creación (Ahora mismo)
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Caduca en 24 horas exactas
                .sign(ALGORITHM); // Lo firmamos con nuestra clave secreta para que nadie lo pueda falsificar
    }
}