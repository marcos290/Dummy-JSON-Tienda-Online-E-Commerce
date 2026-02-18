package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * CONFIGURACIÓN DEL CODIFICADOR DE CONTRASEÑAS (PasswordEncoderConfig)
 * Esta clase define cómo el sistema tratará las contraseñas de los usuarios
 * al momento de compararlas durante el Login.
 */
@Configuration // Indica que esta clase contiene definiciones de Beans para el contexto de Spring
public class PasswordEncoderConfig {

    /**
     * DEFINICIÓN DEL BEAN PasswordEncoder
     * El PasswordEncoder es la interfaz que utiliza Spring Security para
     * gestionar el hashing y la validación de contraseñas.
     * * @return Una instancia de NoOpPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        /**
         * NOTA TÉCNICA:
         * Se utiliza 'NoOpPasswordEncoder', lo que significa que las contraseñas
         * se gestionan en TEXTO PLANO (sin cifrar) dentro de la base de datos SQL.
         * * JUSTIFICACIÓN PARA EL PROYECTO:
         * Esta configuración se ha elegido para facilitar la fase de desarrollo,
         * depuración y carga de datos iniciales en la base de datos, permitiendo
         * una verificación visual rápida de las credenciales.
         * * En un entorno de producción real, este Bean se sustituiría por
         * 'BCryptPasswordEncoder' para cumplir con los estándares de hash y salting.
         */
        return NoOpPasswordEncoder.getInstance();
    }
}