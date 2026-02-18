import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Aquí guardamos la lista de la compra
  private items: any[] = [];

  constructor() { }

  // Método para añadir un producto
  addToCart(product: any) {
    this.items.push(product);
  }

  // Método para ver qué tenemos en el carrito
  getItems() {
    return this.items;
  }

  // Método para saber cuántos productos hay (para el circulito rojo)
  getCount() {
    return this.items.length;
  }

  // Método para vaciarlo todo
  clearCart() {
    this.items = [];
    return this.items;
  }
}
