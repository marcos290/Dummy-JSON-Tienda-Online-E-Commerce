package com.example.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * SERVICIO DE GENERACIÓN DE TOKENS (JwtService)
 * Este servicio se encarga de la creación y firma de los JSON Web Tokens.
 * Es el componente que garantiza que la identidad del usuario sea inalterable.
 */
@Service
public class JwtService {

    /**
     * CLAVE SECRETA (Secret Key): Es la semilla utilizada para firmar el token.
     * CIBERSEGURIDAD: Solo el servidor conoce esta clave. Si un hacker intenta cambiar
     * su rol de 'USER' a 'ADMIN' en el navegador, la firma dejará de coincidir
     * con esta clave y el servidor rechazará el token.
     */
    private static final String SECRET_KEY = "MiClaveSuperSecretaParaElEcommerceDe2DAW";

    // Definimos el algoritmo de cifrado simétrico HMAC256 usando nuestra clave secreta.
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET_KEY);

    /**
     * MÉTODO PARA GENERAR EL TOKEN
     * Crea un string cifrado que contiene la información del usuario (Payload).
     * @param user La entidad del usuario que se acaba de autenticar.
     * @return Un string JWT firmado.
     */
    public String generateToken(User user) {
        return JWT.create()
                // 1. SUBJECT: Identificador principal del usuario (en este caso, su email).
                .withSubject(user.getEmail())

                // 2. CLAIMS: Datos adicionales que "reclamamos" como ciertos.
                // Guardamos el rol para que el Frontend y el Filter sepan qué permisos tiene.
                .withClaim("role", user.getRole())

                // 3. IAT (Issued At): Marca de tiempo de cuándo se generó el token.
                .withIssuedAt(new Date())

                // 4. EXP (Expires At): Fecha de caducidad.
                // Configurado para 24 horas (1000ms * 60s * 60m * 24h).
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))

                // 5. SIGNATURE: Firmamos todo el bloque anterior con el algoritmo y la clave secreta.
                .sign(ALGORITHM);
    }
}