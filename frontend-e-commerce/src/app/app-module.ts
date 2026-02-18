import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard'; 


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Carrito } from './components/carrito/carrito';

@NgModule({
  declarations: [
    App,            
    Login, 
    Registro, 
    Dashboard, Carrito
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    CommonModule,
    AppRoutingModule,
    FormsModule,           // <--- Añadida coma
    MatToolbarModule,       
    MatButtonModule,       // <--- Añadido a la lista
    MatIconModule,
    MatCardModule,
    MatBadgeModule,  
    MatSnackBarModule       
  ],
  providers: [
    provideHttpClient() 
  ],
  bootstrap: [App]  
})
export class AppModule { }