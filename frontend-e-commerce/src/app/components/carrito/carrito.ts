import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart'; // Revisa que la ruta sea correcta

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  standalone: false
})
export class Carrito implements OnInit {
  
  // Aquí guardaremos los productos que la gente meta
  productosCarrito: any[] = [];
  
  // Aquí guardaremos el total a pagar
  precioTotal: number = 0;

  // Inyectamos el servicio igual que hicimos en el Dashboard
  constructor(public cartService: CartService) {}

  ngOnInit() {
    // 1. Pedimos la lista de productos al servicio
    // OJO: Si en tu servicio la función se llama diferente, cámbiala aquí
    this.productosCarrito = this.cartService.getItems(); 
    
    // 2. Calculamos cuánto cuesta todo
    this.calcularTotal();
  }

  // Función experta en JavaScript para sumar todos los precios del array
  calcularTotal() {
    this.precioTotal = this.productosCarrito.reduce((suma, producto) => suma + producto.price, 0);
  }
}