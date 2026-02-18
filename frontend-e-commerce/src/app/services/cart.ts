import { Injectable } from '@angular/core';

/**
 * SERVICIO: CartService
 * Actúa como el gestor de estado para el carrito de compras.
 * Al estar inyectado en la raíz ('root'), funciona como un Singleton: 
 * la información persiste mientras el usuario navega por las distintas vistas.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  /**
   * ESTADO DEL CARRITO: Array privado que almacena los objetos de productos.
   * Se mantiene en la memoria volátil de la aplicación.
   */
  private items: any[] = [];

  constructor() { }

  /**
   * AÑADIR AL CARRITO: Inserta un nuevo producto en la lista.
   * Este método es llamado desde el Dashboard cuando el usuario pulsa "Añadir".
   * @param product Objeto con la información del producto seleccionado.
   */
  addToCart(product: any) {
    this.items.push(product);
  }

  /**
   * OBTENER PRODUCTOS: Devuelve la lista actual de artículos.
   * Utilizado por el componente 'Carrito' para renderizar la lista de la compra.
   */
  getItems() {
    return this.items;
  }

  /**
   * CONTADOR DINÁMICO: Calcula la cantidad total de artículos.
   * Fundamental para el Check visual del [matBadge] en el Toolbar (el circulito rojo).
   * @return El número de elementos presentes en el array.
   */
  getCount() {
    return this.items.length;
  }

  /**
   * VACIAR CARRITO: Reinicia el array de productos.
   * Se utiliza típicamente después de confirmar una compra o por decisión del usuario.
   */
  clearCart() {
    this.items = [];
    return this.items;
  }
}