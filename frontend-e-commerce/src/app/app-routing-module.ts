import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';

const routes: Routes = [
  // Si entras a localhost:4200, te manda al login
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // Ruta del login
  { path: 'login', component: Login },
  
  // ¡AQUÍ ESTÁ LA CLAVE! La ruta tiene que llamarse exactamente 'registro'
  { path: 'registro', component: Registro }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }