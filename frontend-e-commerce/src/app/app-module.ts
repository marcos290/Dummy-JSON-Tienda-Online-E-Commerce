import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 1. RECUPERAMOS LOS IMPORTS VITALES PARA EL FORMULARIO Y EL BACKEND
import { FormsModule } from '@angular/forms'; 
import { provideHttpClient } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro'; 

@NgModule({
  declarations: [
    App,            
    Login, Registro
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // <--- Obligatorio para que no reviente el HTML del login
  ],
  providers: [
    provideHttpClient() // <--- Obligatorio para poder conectar con Spring Boot
    // (He eliminado el provideBrowserGlobalErrorListeners que te daba el error chungo)
  ],
  bootstrap: [App]  
})
export class AppModule { }