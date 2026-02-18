import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // LA MAGIA: Solo te echa si da 401 Y la petición NO viene de hacer Login
      if ((error.status === 401 || error.status === 403) && !req.url.includes('/api/auth/')) {
        localStorage.removeItem('token_tienda');
        localStorage.removeItem('role_tienda');
        
        snackBar.open('⚠️ Sesión caducada. Por favor, identifícate de nuevo.', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};