import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // <--- 1. AÑADE ESTO
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard'; 

@NgModule({
  declarations: [
    App,            
    Login, Registro, Dashboard
  ],
  imports: [
    BrowserModule,
    CommonModule,   // <--- 2. AÑADE ESTO AQUÍ
    AppRoutingModule,
    FormsModule 
  ],
  providers: [
    provideHttpClient() 
  ],
  bootstrap: [App]  
})
export class AppModule { }