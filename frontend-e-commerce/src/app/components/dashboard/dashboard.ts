import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Carrito } from '../carrito/carrito';
import { EditarProducto } from '../editar-producto/editar-producto';

/**
 * COMPONENTE DASHBOARD
 * Es la vista principal de la aplicación. Gestiona el catálogo, el carrito
 * y el control de acceso según el rol del usuario.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false // Indica que este componente pertenece a un AppModule
})
export class Dashboard implements OnInit {
  // Array que almacenará la lista de productos traída de la API
  productos: any[] = [];
  
  // Flag de seguridad (RBAC): Controla si el usuario tiene privilegios de ADMIN
  esAdmin: boolean = false; 

  constructor(
    private productService: ProductService, // Servicio para obtener datos de DummyJSON
    public cartService: CartService,       // Servicio para gestionar el carrito de compras
    private router: Router,                // Navegación entre rutas
    private snackBar: MatSnackBar,         // Notificaciones visuales rápidas
    private dialog: MatDialog,             // Servicio para abrir ventanas modales (carrito/edición)
    private cdr: ChangeDetectorRef ,       // Fuerza la actualización de la vista si Angular no detecta cambios
    private http: HttpClient               // Cliente HTTP para peticiones directas
  ) {}

  /**
   * MÉTODO DE INICIALIZACIÓN (Lifecycle Hook)
   * Se ejecuta al cargar el componente. Aquí gestionamos la seguridad por roles.
   */
  ngOnInit() {
    // 1. Recuperamos el rol almacenado en el navegador tras el login exitoso
    let rolGuardado = localStorage.getItem('role_tienda'); 

    // 2. DEBUG: Log para verificar la consistencia de datos en desarrollo
    console.log("DEBUG: Lo que hay en el LocalStorage es:", rolGuardado);

    if (rolGuardado) {
      // 3. LIMPIEZA DE DATOS: Eliminamos comillas accidentales del JSON.stringify (Check Vital)
      rolGuardado = rolGuardado.replace(/"/g, '');

      // 4. VALIDACIÓN DE ROL: Activamos permisos de administrador si el valor coincide exactamente
      if (rolGuardado === 'ADMIN') {
        this.esAdmin = true;
        console.log("RESULTADO: Eres ADMIN. Botones activados.");
      } else {
        console.log(" RESULTADO: Eres USER normal. Botones ocultos.");
      }
    } else {
      console.log(" RESULTADO: No hay ningún rol guardado.");
    }

    this.cargarProductos();
  }

  /**
   * Carga los productos desde el servicio ProductService (API externa)
   */
  cargarProductos() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        // Mapeamos la respuesta: DummyJSON encapsula los datos en la propiedad 'products'
        this.productos = res.products; 
        // Notificamos a Angular que los datos han cambiado para renderizar la lista
        this.cdr.detectChanges(); 
      }
    });
  }

  /**
   * ABRE EL MODAL DE EDICIÓN
   * @param prod El producto seleccionado de la lista
   */
  onEdit(prod: any) {
    // Abre el componente EditarProducto en una ventana emergente pasando los datos (DATA)
    const dialogRef = this.dialog.open(EditarProducto, {
      width: '400px',
      data: prod 
    });

    // Se suscribe al cierre del diálogo para actualizar la lista localmente sin recargar la página
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        const index = this.productos.findIndex(p => p.id === resultado.id);
        if (index !== -1) {
          this.productos[index] = resultado; // Actualización reactiva de la UI
          this.snackBar.open(' Producto actualizado correctamente', 'OK', { duration: 3000 });
          this.cdr.detectChanges(); 
        }
      }
    });
  }

  /**
   * ELIMINACIÓN LOCAL DE PRODUCTOS
   * Demuestra el manejo de arrays y filtros en TypeScript
   */
  onDelete(id: number) {
    if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      // Filtramos el array para quitar el elemento borrado (optimismo en la UI)
      this.productos = this.productos.filter(p => p.id !== id);
      this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 2000 });
    }
  }

  /**
   * Delega en el servicio la lógica de añadir productos al carrito
   */
  agregarAlCarrito(prod: any) {
    this.cartService.addToCart(prod);
    this.snackBar.open('Añadido: ' + prod.title, 'OK', { duration: 2000 });
  }

  /**
   * Abre la vista del carrito en formato modal
   */
  abrirCarrito() {
    this.dialog.open(Carrito, { width: '500px' });
  }

  /**
   * CIERRE DE SESIÓN: Limpia las credenciales y redirige al Login
   */
  onLogout() {
    localStorage.removeItem('token_tienda');
    localStorage.removeItem('role_tienda'); 
    this.router.navigate(['/login']);
  }

  /**
   * MÉTODO DE PRUEBA (Ciberseguridad):
   * Realiza una petición a un endpoint protegido de DummyJSON para verificar
   * si el Interceptor está funcionando correctamente con el token actual.
   */
  probarSeguridad() {
    console.log("Comprobando seguridad estricta...");
    this.http.get('https://dummyjson.com/auth/me').subscribe();
  }
}