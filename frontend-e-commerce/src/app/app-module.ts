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

// --- MÓDULOS DE ANGULAR MATERIAL ---
// Cada módulo proporciona componentes específicos para la UI (interfaz de usuario).
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';

// --- INTERCEPTORES (CORE) ---
// Importamos la lógica que interceptará las peticiones HTTP para añadir seguridad.
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';

/**
 * MÓDULO PRINCIPAL: AppModule
 * Centraliza la configuración de la aplicación, definiendo qué componentes
 * se cargan y qué servicios están disponibles globalmente.
 */
@NgModule({
  /**
   * DECLARACIONES:
   * Aquí se registran todos los componentes que pertenecen a este módulo.
   * Al estar aquí, pueden comunicarse entre sí y compartir recursos.
   */
  declarations: [
    App, 
    Login, 
    Registro, 
    Dashboard, 
    Carrito, 
    EditarProducto
  ],
  /**
   * IMPORTACIONES:
   * Módulos externos que nuestra aplicación necesita para funcionar correctamente.
   */
  imports: [
    BrowserModule,            // Necesario para ejecutar la app en el navegador
    BrowserAnimationsModule,   // Habilita las animaciones de Angular Material
    CommonModule,             // Directivas básicas de Angular (ngIf, ngFor)
    AppRoutingModule,         // Configuración de las rutas (URL)
    FormsModule,              // Habilita el Two-Way Data Binding [(ngModel)]
    
    // Módulos de UI para un diseño profesional y consistente
    MatToolbarModule,       
    MatButtonModule,       
    MatIconModule,
    MatCardModule,
    MatBadgeModule,  
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,        // Permite usar campos de texto de Material
    MatFormFieldModule     // Envuelve los inputs para añadir etiquetas y errores
  ],
  /**
   * PROVEEDORES:
   * Aquí configuramos los servicios globales y la configuración de red.
   */
  providers: [
    // Configuramos el cliente HTTP con nuestros interceptores personalizados
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    )
  ],
  // Componente raíz que arranca la aplicación
  bootstrap: [App]  
})
export class AppModule { }