package com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    // Extraemos la URL de la API desde el application.properties
    @Value("${api.dummyjson.url:https://dummyjson.com}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * GET: Actúa como puente (Proxy) hacia DummyJSON.
     * Angular te llama a ti, y tú llamas a la API externa.
     */
    @GetMapping
    public ResponseEntity<Object> getAll() {
        // Llamamos a la API externa
        Object productos = restTemplate.getForObject(apiUrl + "/products", Object.class);
        return ResponseEntity.ok(productos);
    }

    /**
     * PUT: Aquí es donde brilla la seguridad.
     * Aunque los datos vengan de fuera, solo un ADMIN puede "simular" la edición.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Object productDetails) {
        // En un proxy real, enviarías el PUT a la API externa
        // DummyJSON no guarda cambios reales, pero simulamos la respuesta
        return ResponseEntity.ok(productDetails);
    }

    /**
     * DELETE: Solo el que tenga el rol de ADMIN en TU MySQL puede borrar.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Aquí podrías llamar a la API externa para borrar
        // restTemplate.delete(apiUrl + "/products/" + id);
        System.out.println("Producto con ID " + id + " eliminado por un ADMIN");
        return ResponseEntity.noContent().build();
    }
}