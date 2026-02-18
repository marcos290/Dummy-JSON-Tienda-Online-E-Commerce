import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product'; // Asegúrate que el archivo se llame así
import { CartService } from '../../services/cart';     // Asegúrate que el archivo se llame así
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false
})
export class Dashboard implements OnInit {
  productos: any[] = [];

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar // <--- ¡ESTA ERA LA PIEZA QUE FALTABA!
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

cargarProductos() {
    console.log('1. Pidiendo productos a DummyJSON...'); 
    
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log('2. ¡Respuesta recibida de la API!', res); 
        
        // DummyJSON envía los datos dentro de una propiedad llamada 'products'
        this.productos = res.products; 
        
        console.log('3. Array de productos guardado:', this.productos); 
      },
      error: (err) => {
        console.error('ERROR CRÍTICO al pedir los productos:', err); 
      }
    });
  }

  agregarAlCarrito(prod: any) {
    this.cartService.addToCart(prod);
    this.snackBar.open('Añadido: ' + prod.title, 'OK', { duration: 2000 });
  }

  onEdit(prod: any) {
    this.snackBar.open('Editando: ' + prod.title, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  onDelete(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 2000 });
  }

  onLogout() {
    localStorage.removeItem('token_tienda');
    this.router.navigate(['/login']);
  }
}