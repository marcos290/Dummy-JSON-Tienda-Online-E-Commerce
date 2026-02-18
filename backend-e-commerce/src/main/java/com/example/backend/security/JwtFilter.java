package com.example.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * FILTRO DE SEGURIDAD JWT (JwtFilter)
 * Este componente intercepta cada petición HTTP que llega al servidor para verificar
 * si contiene un token válido. Hereda de 'OncePerRequestFilter' para asegurar que
 * se ejecute exactamente una vez por cada solicitud.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Extraemos la cabecera 'Authorization' de la petición entrante
        String authHeader = request.getHeader("Authorization");

        // 2. Comprobamos si existe el token y si empieza por el prefijo estándar 'Bearer '
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Extraemos solo el string del JWT
            try {
                // 3. PROCESO DE DECODIFICACIÓN:
                // Abrimos el token para extraer la identidad (Subject) y los permisos (Claim)
                DecodedJWT jwt = JWT.decode(token);
                String email = jwt.getSubject();
                String role = jwt.getClaim("role").asString();

                // 4. VALIDACIÓN Y AUTORIZACIÓN:
                // Si el token contiene un email, creamos un objeto de autenticación para Spring Security
                if (email != null) {
                    // Creamos el 'UsernamePasswordAuthenticationToken' con el rol del usuario
                    // 'SimpleGrantedAuthority' convierte el string del rol en un permiso reconocible por el framework
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            email, null, Collections.singletonList(new SimpleGrantedAuthority(role))
                    );

                    // 5. REGISTRO EN EL CONTEXTO:
                    // Guardamos la autenticación en el SecurityContextHolder.
                    // A partir de este momento, Java "sabe" quién es el usuario durante toda la petición.
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                // CIBERSEGURIDAD: Si el token es corrupto, ha sido manipulado o ha caducado,
                // la excepción se captura y no se establece la autenticación.
                // Los endpoints protegidos devolverán un 401/403 automáticamente.
            }
        }

        // 6. CONTINUIDAD:
        // Pasamos la petición al siguiente filtro en la cadena (o al controlador si todo está ok)
        filterChain.doFilter(request, response);
    }
}