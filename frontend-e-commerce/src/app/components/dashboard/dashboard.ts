import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Carrito } from '../carrito/carrito';
import { EditarProducto } from '../editar-producto/editar-producto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false
})
export class Dashboard implements OnInit {
  productos: any[] = [];
  esAdmin: boolean = false; 

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef ,
    private http: HttpClient
  ) {}

 ngOnInit() {
  // 1. Leemos el valor del LocalStorage
  let rolGuardado = localStorage.getItem('role_tienda'); 

  // 2. CHIVATO: Mira esto en la consola del navegador (F12)
  console.log("DEBUG: Lo que hay en el LocalStorage es:", rolGuardado);

  if (rolGuardado) {
    // 3. Quitamos comillas si las hubiera (esto arregla el 90% de los fallos)
    rolGuardado = rolGuardado.replace(/"/g, '');

    if (rolGuardado === 'ADMIN') {
      this.esAdmin = true;
      console.log("✅ RESULTADO: Eres ADMIN. Botones activados.");
    } else {
      console.log("❌ RESULTADO: Eres USER normal. Botones ocultos.");
    }
  } else {
    console.log("⚠️ RESULTADO: No hay ningún rol guardado.");
  }

  this.cargarProductos();
}

  cargarProductos() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        // DummyJSON devuelve los productos dentro de un objeto 'products'
        this.productos = res.products; 
        this.cdr.detectChanges(); 
      }
    });
  }

  onEdit(prod: any) {
    const dialogRef = this.dialog.open(EditarProducto, {
      width: '400px',
      data: prod 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        const index = this.productos.findIndex(p => p.id === resultado.id);
        if (index !== -1) {
          this.productos[index] = resultado;
          this.snackBar.open('✅ Producto actualizado correctamente', 'OK', { duration: 3000 });
          this.cdr.detectChanges(); 
        }
      }
    });
  }

  onDelete(id: number) {
    if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
      this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 2000 });
    }
  }

  agregarAlCarrito(prod: any) {
    this.cartService.addToCart(prod);
    this.snackBar.open('Añadido: ' + prod.title, 'OK', { duration: 2000 });
  }

  abrirCarrito() {
    this.dialog.open(Carrito, { width: '500px' });
  }

  onLogout() {
    localStorage.removeItem('token_tienda');
    localStorage.removeItem('role_tienda'); // Limpiamos el nombre correcto
    this.router.navigate(['/login']);
  }
  // Botón trampa para demostrarle a Iván que el interceptor funciona
  probarSeguridad() {
    console.log("Comprobando seguridad estricta...");
    // Esta API es súper estricta. Si el token es "caca", devolverá error 401
    this.http.get('https://dummyjson.com/auth/me').subscribe();
  }
}