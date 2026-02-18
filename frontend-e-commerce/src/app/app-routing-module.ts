import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard';

// --- PASO 1: IMPORTACIÓN DE SEGURIDAD ---
// Importamos el Guard funcional para validar el acceso a rutas protegidas.
import { authGuard } from './core/guards/auth-guard'; 

/**
 * CONFIGURACIÓN DE RUTAS (Routes)
 * Define el mapeo entre las URLs del navegador y los componentes de Angular.
 */
const routes: Routes = [
  // 1. RUTA INICIAL: Redirección automática.
  // Si el usuario entra en la raíz, lo enviamos directamente al Login.
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // 2. RUTA DE LOGIN: Acceso al formulario de autenticación.
  { path: 'login', component: Login },
  
  // 3. RUTA DE REGISTRO: Acceso al formulario de creación de cuenta.
  { path: 'registro', component: Registro }, 
  
  // 4. RUTA PROTEGIDA (DASHBOARD):
  // Check 10: Aplicamos 'canActivate'. 
  // El 'authGuard' intercepta el intento de entrada y solo permite el paso si hay un token válido.
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard] // 🔒 Escudo de seguridad en el lado del cliente.
  },

  // 5. MANEJO DE RUTAS NO ENCONTRADAS (Check 11):
  // El comodín '**' captura cualquier URL que no coincida con las anteriores (Error 404).
  // Redirigimos al Login para asegurar que el usuario siempre esté en un entorno controlado.
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  // 'forRoot' registra las rutas en el root de la aplicación.
  imports: [RouterModule.forRoot(routes)],
  // Exportamos RouterModule para que sus directivas (como routerLink) estén disponibles en AppModule.
  exports: [RouterModule]
})
export class AppRoutingModule { }