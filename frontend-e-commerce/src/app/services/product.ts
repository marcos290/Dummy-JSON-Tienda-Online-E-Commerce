import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * SERVICIO: ProductService
 * Actúa como el nexo de unión entre el Frontend y el catálogo de productos del Backend.
 * Todas las operaciones CRUD de productos se centralizan aquí.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  /**
   * URL DE LA API: Apunta a nuestro servidor local de Spring Boot.
   * Es vital que coincida con el puerto configurado en el 'application.properties' de Java.
   */
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  /**
   * OBTENER PRODUCTOS: Solicita la lista al servidor Java.
   * Este método es llamado por el Dashboard. Aunque los datos vienen originalmente
   * de DummyJSON, pasan primero por nuestro Proxy en Java para mayor control.
   * @return Un Observable con la lista de productos.
   */
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * ELIMINAR PRODUCTO: Realiza una petición DELETE al servidor.
   * CIBERSEGURIDAD: Esta petición será interceptada por nuestro 'authInterceptor',
   * el cual adjuntará el Token JWT. Si el usuario no es ADMIN, el Backend (Spring Security)
   * rechazará la operación con un error 403.
   * @param id Identificador único del producto a borrar.
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}