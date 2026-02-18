import { Component } from '@angular/core';
import { Auth } from '../../services/auth'; 
import { Router } from '@angular/router';

/**
 * COMPONENTE: Login
 * Gestiona el formulario de acceso y la comunicación inicial con el servidor
 * para obtener las credenciales de seguridad (JWT y Rol).
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false 
})
export class Login { 
  
  // Objeto vinculado al formulario mediante [(ngModel)] en el HTML
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: Auth, // Servicio que contiene la lógica de comunicación con la API
    private router: Router      // Servicio de Angular para la navegación entre vistas
  ) { }

  /**
   * MÉTODO: onLogin
   * Se ejecuta al enviar el formulario. Inicia el proceso de autenticación.
   */
  onLogin() {
    // Log de control para depuración en desarrollo
    console.log('Enviando datos...', this.user);
    
    /**
     * Invocamos al método login del servicio.
     * Al ser una petición HTTP, nos suscribimos al Observable para manejar la respuesta.
     */
    this.authService.login(this.user).subscribe({
      next: (res) => {
        /**
         * ÉXITO EN LA AUTENTICACIÓN:
         * No es necesario guardar el token manualmente aquí, ya que el servicio Auth
         * utiliza el operador 'tap' para interceptar la respuesta y almacenarla.
         */
        console.log('Respuesta del servidor:', res);
        
        // Una vez autenticado correctamente, redirigimos al usuario a la zona privada
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        /**
         * MANEJO DE ERRORES:
         * Si las credenciales son incorrectas o el servidor no responde,
         * mostramos un aviso al usuario y registramos el fallo por consola.
         */
        console.error('Error en login:', err);
        alert('Fallo en el login. Comprueba tus credenciales.');
      }
    });
  }
}