package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * CONFIGURACIÓN GLOBAL DE SEGURIDAD (SecurityConfig)
 * Clase central donde se definen las políticas de acceso, seguridad HTTP y reglas de navegación.
 */
@Configuration
@EnableWebSecurity // Habilita la seguridad web personalizada de Spring Security
public class SecurityConfig {

    /**
     * CADENA DE FILTROS DE SEGURIDAD (SecurityFilterChain)
     * Define qué peticiones están protegidas y cuáles son de libre acceso.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. CIBERSEGURIDAD: Desactivamos CSRF ya que usamos JWT (Stateless).
                // Activamos CORS con la configuración definida más abajo.
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults())

                // 2. ARQUITECTURA REST: Desactivamos el formulario de login por defecto y
                // la autenticación básica, ya que nuestra app es una SPA (Angular) gestionada por Tokens.
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)

                // 3. REGLAS DE AUTORIZACIÓN:
                .authorizeHttpRequests(auth -> auth
                        // ENDPOINTS PÚBLICOS: Login, Registro y consulta de productos.
                        // Son accesibles sin necesidad de token para que los clientes puedan navegar.
                        .requestMatchers("/api/auth/**", "/api/products/**", "/api/products").permitAll()

                        // ENDPOINTS PROTEGIDOS: Cualquier otra ruta (ej. borrar productos)
                        // requerirá que el JwtFilter haya validado un token correctamente.
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    /**
     * CONFIGURACIÓN DE CORS (Cross-Origin Resource Sharing)
     * Define desde qué dominios y con qué métodos se puede "llamar" a este Backend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Permitimos peticiones solo desde nuestro Frontend Angular para evitar ataques externos.
        config.setAllowedOrigins(List.of("http://localhost:4200"));

        // Habilitamos los verbos HTTP necesarios para un CRUD completo.
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permitimos la cabecera 'Authorization' para recibir los tokens JWT.
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // Permitimos el envío de credenciales si fuera necesario.
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicamos esta configuración de seguridad a todas las rutas del API.
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}