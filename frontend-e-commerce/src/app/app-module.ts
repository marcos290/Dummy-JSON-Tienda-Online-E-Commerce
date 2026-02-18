import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard'; 
import { Carrito } from './components/carrito/carrito';
import { EditarProducto } from './components/editar-producto/editar-producto';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';         // <--- NECESARIO PARA EL FORMULARIO
import { MatFormFieldModule } from '@angular/material/form-field'; // <--- NECESARIO PARA EL MAT-ERROR

// Interceptores
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';

@NgModule({
  declarations: [
    App, 
    Login, 
    Registro, 
    Dashboard, 
    Carrito, 
    EditarProducto
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    CommonModule,
    AppRoutingModule,
    FormsModule,           
    MatToolbarModule,       
    MatButtonModule,       
    MatIconModule,
    MatCardModule,
    MatBadgeModule,  
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,        // <--- ¡AQUÍ ESTÁ LA MAGIA!
    MatFormFieldModule     // <--- ¡AQUÍ ESTÁ LA MAGIA!
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ],
  bootstrap: [App]  
})
export class AppModule { }