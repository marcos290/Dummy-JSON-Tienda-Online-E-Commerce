import { Component } from '@angular/core';
import { Auth } from '../../services/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false 
})
export class Login { 
  
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: Auth, private router: Router) { }

  onLogin() {
    console.log('Enviando datos...', this.user);
    
    this.authService.login(this.user).subscribe({
      next: (res) => {
        // Ya no llamamos a saveToken aquí, 
        // porque el servicio Auth ya lo hace con el 'tap'
        
        console.log('Respuesta del servidor:', res);
        
        // Redirigimos al dashboard
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Fallo en el login. Comprueba tus credenciales.');
      }
    });
  }
}