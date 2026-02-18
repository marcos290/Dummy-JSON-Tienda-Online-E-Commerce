import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // <-- IMPORTANTE PARA EL GUARDADO

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private URL = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.URL}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, credentials).pipe(
      tap(res => {
        // Guardamos todo lo que nos devuelve Java
        if (res && res.token) {
          localStorage.setItem('token_tienda', res.token);
          localStorage.setItem('role_tienda', res.role); // <-- Aquí se guarda el ADMIN
          console.log('Login exitoso. Rol guardado:', res.role);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token_tienda'); 
  }

  logout() {
    localStorage.removeItem('token_tienda');
    localStorage.removeItem('role_tienda');
  }
}