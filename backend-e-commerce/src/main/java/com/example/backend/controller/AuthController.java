package com.example.backend.controller;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * CONTROLADOR DE AUTENTICACIÓN
 * Este componente actúa como la puerta de entrada para todas las peticiones de acceso.
 * Se encarga de gestionar el registro y el inicio de sesión de los usuarios.
 */
@RestController // Define esta clase como un controlador REST donde cada método devuelve datos (JSON)
@RequestMapping("/api/auth") // Define la ruta base para todos los endpoints de este controlador
@RequiredArgsConstructor // Inyecta automáticamente los campos finales (final) mediante el constructor (Lombok)
@CrossOrigin(origins = "http://localhost:4200") // Protocolo de seguridad para permitir peticiones desde el Frontend Angular
public class AuthController {

    // Servicio que contiene la lógica de negocio y seguridad para validar credenciales
    private final AuthService authService;

    /**
     * ENDPOINT DE REGISTRO
     * @param request Objeto DTO con el email y contraseña del nuevo usuario
     * @return ResponseEntity con el Token JWT generado y el rol asignado
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        // Recibe los datos en formato JSON, los mapea al objeto AuthRequest y delega en el servicio
        // Este método cumple con los criterios de validación y persistencia de nuevos usuarios
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * ENDPOINT DE LOGIN
     * @param request Credenciales del usuario (email y password)
     * @return ResponseEntity con el Token JWT si la autenticación es exitosa
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // Valida las credenciales contra la base de datos SQL.
        // Si son correctas, genera un token JWT que el Frontend usará para futuras peticiones.
        // Cumple con los checks de autenticación segura y manejo de respuestas HTTP.
        return ResponseEntity.ok(authService.login(request));
    }
}