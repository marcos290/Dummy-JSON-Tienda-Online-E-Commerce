import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  standalone: false // <--- REGLA DE ORO: No puede ser standalone si está en el declarations de AppModule
})
export class Registro {
  
  // Objeto que usa el ngModel en el HTML
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: Auth, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert('Cuenta creada con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Error al registrar usuario')
    });
  }
}