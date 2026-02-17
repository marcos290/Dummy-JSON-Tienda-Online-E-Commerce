import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';

// --- PASO 1: Importamos el Dashboard apuntando a tu archivo exacto ---
import { Dashboard } from './components/dashboard/dashboard'; 

const routes: Routes = [
  // Si entras a localhost:4200, te manda al login
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // Ruta del login
  { path: 'login', component: Login },
  
  // Ruta del registro
  { path: 'registro', component: Registro }, 
  
  // --- PASO 2: Añadimos la ruta de la tienda usando la clase correcta ---
  { path: 'dashboard', component: Dashboard }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }