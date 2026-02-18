import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth'; 

/**
 * COMPONENTE: Registro
 * Gestiona el alta de nuevos usuarios en el sistema.
 * Se conecta con el backend para persistir las nuevas credenciales.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  /**
   * REGLA DE ORO: 'standalone: false'
   * Este componente no es independiente; debe ser declarado en el array 'declarations' 
   * del módulo principal (AppModule) para poder usar las directivas de Material y Forms.
   */
  standalone: false 
})
export class Registro {
  
  // Objeto vinculado al formulario mediante [(ngModel)]
  // Incluye el username, requerido para el Check 1 del proyecto.
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: Auth, // Servicio de autenticación
    private router: Router      // Servicio para redirigir tras el éxito
  ) {}

  /**
   * MÉTODO: onRegister
   * Envía la solicitud de creación de cuenta al servidor.
   */
  onRegister() {
    // Invocamos el servicio y nos suscribimos a la respuesta asíncrona
    this.authService.register(this.user).subscribe({
      next: (res) => {
        // Si el backend responde OK, informamos al usuario
        alert('Cuenta creada con éxito');
        
        /**
         * FLUJO DE NAVEGACIÓN:
         * Una vez registrado, enviamos al usuario al Login para que 
         * inicie su primera sesión de forma manual (buena práctica de seguridad).
         */
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Gestión de errores (ej: email ya existente o fallo de red)
        alert('Error al registrar usuario');
      }
    });
  }
}