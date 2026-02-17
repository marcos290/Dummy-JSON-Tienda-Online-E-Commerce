import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  standalone: false
})
export class Registro {
  
  // 1. Añadimos el confirmPassword para que el HTML no se queje
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '' // <--- ¡Esta es la pieza que faltaba!
  };

  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    // 2. Validación de contraseñas (Opcional pero muy profesional)
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden, compruébalas.');
      return; // Cortamos la ejecución para no enviar basura al backend
    }

    // 3. Preparamos el paquete exacto que Spring Boot espera (sin confirmPassword)
    const userDataParaBackend = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password
    };

    // 4. Enviamos los datos correctos
    this.auth.register(userDataParaBackend).subscribe({
      next: (res) => {
        console.log('¡Usuario registrado!', res);
        alert('¡Registro completado con éxito!');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Error en el registro', err);
        alert('Error al registrar: revisa si el email ya existe.');
      }
    });
  }
}