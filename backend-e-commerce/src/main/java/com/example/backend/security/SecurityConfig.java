package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Desactivo CSRF porque para APIs con tokens JWT no es necesario
                .csrf(AbstractHttpConfigurer::disable)

                // Defino la política de acceso a los recursos
                .authorizeHttpRequests(auth -> auth
                        // Configuro acceso público para productos, consola H2 y endpoints de auth
                        .requestMatchers("/api/products/**", "/h2-console/**", "/api/auth/**").permitAll()
                        // El resto de peticiones requieren obligatoriamente un token válido
                        .anyRequest().authenticated()
                )

                // Habilito el renderizado de frames para poder usar la interfaz de la BD H2
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));

        // Construyo y devuelvo la cadena de filtros de seguridad
        return http.build();
    }
}