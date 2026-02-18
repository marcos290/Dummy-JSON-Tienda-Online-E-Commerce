import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * INTERCEPTOR DE ERRORES (errorInterceptor)
 * Este interceptor monitoriza las respuestas del servidor. Si detecta un error de 
 * autorización (401 o 403), gestiona automáticamente el cierre de sesión.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  // 'pipe' permite encadenar operadores de RxJS a la respuesta de la petición
  return next(req).pipe(
    // 'catchError' captura cualquier fallo que devuelva el servidor
    catchError((error: HttpErrorResponse) => {
      
      /**
       * GESTIÓN DE SESIÓN CADUCADA (Check de Ciberseguridad):
       * Si el servidor devuelve 401 (No autorizado) o 403 (Prohibido) y NO es una
       * petición de login (para evitar bucles), significa que el token no es válido.
       */
      if ((error.status === 401 || error.status === 403) && !req.url.includes('/api/auth/')) {
        
        // 1. LIMPIEZA: Eliminamos las credenciales corruptas o caducadas del LocalStorage
        localStorage.removeItem('token_tienda');
        localStorage.removeItem('role_tienda');
        
        // 2. FEEDBACK: Notificamos al usuario mediante un SnackBar de Angular Material
        snackBar.open('⚠️ Sesión caducada. Por favor, identifícate de nuevo.', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        
        // 3. REDIRECCIÓN: Enviamos al usuario de vuelta al Login por seguridad
        router.navigate(['/login']);
      }
      
      // Propagamos el error para que el componente que hizo la llamada también pueda manejarlo si quiere
      return throwError(() => error);
    })
  );
};