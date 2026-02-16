package repository;



import com.example.backen.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Al extender JpaRepository, ya tenemos gratis: save(), findAll(), deleteById(), etc.
}
