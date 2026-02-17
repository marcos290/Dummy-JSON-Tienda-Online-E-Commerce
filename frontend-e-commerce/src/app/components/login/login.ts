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
  
  // 1. Las variables del formulario
  user = {
    email: '',
    password: ''
  };

  // 2. El constructor con el Router ya inyectado
  constructor(private authService: Auth, private router: Router) { }

  // 3. La función de Login completa con la redirección
  onLogin() {
    console.log('Enviando datos...', this.user);
    
    this.authService.login(this.user).subscribe({
      next: (res) => {
        // Guardamos el token en el cajón
        this.authService.saveToken(res.token);
        
        // Avisamos de que todo ha ido bien
        alert('¡Login OK!');
        
        // ¡LA MAGIA! 🚀 Le damos la patada a Angular para que nos lleve a la tienda
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        alert('Fallo en el login. Comprueba tus credenciales.');
      }
    });
  }
}