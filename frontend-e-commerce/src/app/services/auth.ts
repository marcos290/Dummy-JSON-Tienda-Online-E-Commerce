import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // Asegúrate de que el puerto sea el 8080 de tu Spring Boot
  private URL = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }

  // Cambiamos /registro por /register para que coincida con tu Java
  register(userData: any): Observable<any> {
    return this.http.post(`${this.URL}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.URL}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token_tienda', token);
  }
}