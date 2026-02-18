import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Operador para ejecutar efectos secundarios

/**
 * SERVICIO: Auth
 * Centraliza toda la lógica de comunicación con los endpoints de seguridad del Backend.
 * Gestiona el almacenamiento persistente de las credenciales en el navegador.
 */
@Injectable({
  providedIn: 'root' // Hace que el servicio sea un Singleton disponible en toda la app
})
export class Auth {
  // Dirección base de nuestra API de autenticación en Spring Boot
  private URL = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }

  /**
   * REGISTRO: Envía los datos del nuevo usuario al servidor.
   * @param userData Objeto con username, email y password.
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.URL}/register`, userData);
  }

  /**
   * LOGIN: Autentica al usuario y gestiona la respuesta.
   * Utiliza el operador 'tap' para realizar acciones automáticas tras el éxito.
   */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, credentials).pipe(
      tap(res => {
        /**
         * PERSISTENCIA DE SESIÓN:
         * Si el servidor devuelve un token válido, lo almacenamos junto con el rol.
         * Esto permite que la sesión se mantenga incluso si el usuario refresca el navegador (F5).
         */
        if (res && res.token) {
          // Guardamos el JWT para que el Interceptor lo use en cada petición
          localStorage.setItem('token_tienda', res.token);
          
          // Guardamos el Rol (ADMIN/ROLE_USER) para gestionar la interfaz (RBAC)
          localStorage.setItem('role_tienda', res.role); 
          
          console.log('Login exitoso. Rol guardado:', res.role);
        }
      })
    );
  }

  /**
   * VERIFICACIÓN DE SESIÓN:
   * Comprueba de forma rápida si existe un token almacenado.
   * El operador '!!' convierte el valor (string o null) en un booleano (true/false).
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token_tienda'); 
  }

  /**
   * CIERRE DE SESIÓN:
   * Elimina rastro de las credenciales en el LocalStorage, invalidando el acceso en el cliente.
   */
  logout() {
    localStorage.removeItem('token_tienda');
    localStorage.removeItem('role_tienda');
  }
}