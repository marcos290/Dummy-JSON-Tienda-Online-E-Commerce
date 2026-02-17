import { Component } from '@angular/core';
import { Auth } from '../../services/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false 
})
export class Login { // <--- Tu clase (o LoginComponent si lo tenías así)
  
  // 1. Las variables del formulario
  user = {
    email: '',
    password: ''
  };

  // 2. El constructor
  constructor(private authService: Auth, private router: Router) { }

  // 3. ¡ESTA ES LA FUNCIÓN QUE TS NO ENCONTRABA!
  onLogin() {
    console.log('Enviando datos...', this.user);
    
    this.authService.login(this.user).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        alert('¡Login OK!');
      },
      error: (err) => {
        alert('Fallo en el login');
      }
    });
  }
}