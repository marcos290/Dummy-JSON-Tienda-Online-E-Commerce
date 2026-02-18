import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Ahora apuntamos a TU servidor local (Spring Boot)
  // El puerto debe coincidir con el 'server.port' de tu application.properties
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Este método ahora le pide los productos a tu Proxy en Java
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Ejemplo de borrado: Ahora sí pasará por tu seguridad de Spring Boot
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}