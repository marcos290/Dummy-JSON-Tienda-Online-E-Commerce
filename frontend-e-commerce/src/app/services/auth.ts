import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // URL de tu API en Spring Boot
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  // Enviar el login al servidor
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Guardar el token JWT
  saveToken(token: string): void {
    localStorage.setItem('token_tienda', token);
  }

  // Obtener el token guardado
  getToken() {
    return localStorage.getItem('token_tienda');
  }
}