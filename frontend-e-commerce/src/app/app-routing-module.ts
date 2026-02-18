import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard';

// --- PASO 1: Importamos el Guard que acabamos de crear ---
import { authGuard } from './core/guards/auth-guard'; // Asegúrate de que la ruta es correcta

const routes: Routes = [
  // Si entras a localhost:4200, te manda al login
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // Ruta del login
  { path: 'login', component: Login },
  
  // Ruta del registro
  { path: 'registro', component: Registro }, 
  
  // --- PASO 2: Protegemos el Dashboard con el canActivate ---
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard] // 🔒 Solo pasan los que tengan token
  },

  // --- PASO 3: Ruta para el 404 (Check 11 de la lista) ---
  // Si escriben cualquier tontería en la URL, los mandamos al login o a una página de error
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }