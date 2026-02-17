import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false
})
export class Dashboard implements OnInit {
  productos: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        // DummyJSON mete el array en una propiedad llamada 'products'
        // Con esto nos aseguramos de que 'productos' siempre sea un Array
        this.productos = res.products || res; 
        console.log('Productos en el componente:', this.productos);
      },
      error: (err) => console.error('Error al traer productos:', err)
    });
  }

  onDelete(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  onEdit(prod: any) {
    alert('Editando: ' + prod.title);
  }

  onLogout() {
    localStorage.removeItem('token_tienda');
    this.router.navigate(['/login']);
  }
}