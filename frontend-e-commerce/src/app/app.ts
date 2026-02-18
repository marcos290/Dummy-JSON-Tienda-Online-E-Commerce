import { Component, signal } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-e-commerce');
}
