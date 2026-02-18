package com.example.backend.repository;

import com.example.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * REPOSITORIO: ProductRepository
 * Esta interfaz es la capa de acceso a datos (DAO) para la entidad Product.
 * Se encarga de la comunicación directa con la tabla 'PRODUCTS' de la base de datos SQL.
 */
@Repository // Indica a Spring que esta interfaz es un componente de persistencia
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Al extender de JpaRepository<Product, Long>, Spring Data JPA genera automáticamente
     * en tiempo de ejecución toda la implementación de las operaciones CRUD básicas:
     * * - save(Product): Inserta o actualiza un producto.
     * - findAll(): Recupera la lista completa de productos (Check para el catálogo).
     * - findById(Long): Busca un producto específico por su clave primaria.
     * - deleteById(Long): Elimina un producto de la base de datos.
     * - count(): Devuelve el número total de registros.
     * * Todo esto se realiza sin escribir una sola línea de SQL manual,
     * garantizando un código más limpio y menos propenso a errores de sintaxis.
     */
}