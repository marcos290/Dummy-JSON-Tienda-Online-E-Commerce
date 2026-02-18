package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ENTIDAD: Product
 * Esta clase representa la tabla "PRODUCTS" en la base de datos SQL.
 * Utiliza JPA para el mapeo objeto-relacional (ORM).
 */
@Data // Genera Getters, Setters y métodos comunes (Lombok).
@Builder // Permite la creación de productos usando el patrón Builder.
@NoArgsConstructor // Constructor vacío requerido por JPA para instanciar la entidad.
@AllArgsConstructor // Constructor con todos los campos para facilitar pruebas y creación manual.
@Entity // Indica a Spring Boot que esta clase es una entidad persistente en base de datos.
@Table(name = "PRODUCTS") // Especifica el nombre exacto de la tabla en el motor SQL.
public class Product {

    /**
     * Clave primaria de la tabla.
     * Se utiliza la estrategia IDENTITY para que el motor SQL gestione el autoincremento.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre o título descriptivo del producto
    private String title;

    /**
     * Descripción extendida del producto.
     * Se define un 'length = 1000' para permitir textos largos que superen los 255 caracteres por defecto.
     */
    @Column(length = 1000)
    private String description;

    // Precio unitario almacenado con precisión decimal
    private Double price;

    // Categoría a la que pertenece el producto (ej. electrónica, ropa)
    private String category;

    /**
     * URL o ruta de la imagen del producto.
     * Se mapea como String para almacenar la referencia visual que consumirá el Frontend Angular.
     */
    private String foto;
}