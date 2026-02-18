import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth'; // Asegúrate de que la ruta a tu servicio es correcta

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // 1. Miramos si el usuario está autenticado (si tiene token)
  if (authService.isAuthenticated()) {
    return true; // ¡Pase usted!
  } else {
    // 2. Si no, le mandamos al login
    console.warn('Acceso denegado. Redirigiendo al login...');
    router.navigate(['/login']);
    return false;
  }
};