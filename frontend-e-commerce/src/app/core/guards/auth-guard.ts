import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth'; // Referencia al servicio de autenticación central

/**
 * GUARD: authGuard (CanActivateFn)
 * Es una guardia de ruta funcional. Su misión es proteger las rutas privadas
 * verificando la existencia de un token válido antes de permitir el acceso.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // En las guardas funcionales de las nuevas versiones de Angular, 
  // usamos 'inject' en lugar del constructor clásico.
  const authService = inject(Auth);
  const router = inject(Router);

  /**
   * 1. VERIFICACIÓN DE IDENTIDAD:
   * Invocamos al método isAuthenticated() del servicio Auth.
   * Este método comprueba si existe el 'token_tienda' en el LocalStorage.
   */
  if (authService.isAuthenticated()) {
    // Si el usuario tiene token, se le permite el acceso a la ruta solicitada.
    return true; 
  } else {
    /**
     * 2. ACCESO DENEGADO (CIBERSEGURIDAD):
     * Si un usuario intenta "saltarse" el login escribiendo la URL manualmente,
     * este bloque lo detecta, bloquea la navegación y lo redirige al Login.
     */
    console.warn('Acceso denegado. Redirigiendo al login...');
    router.navigate(['/login']);
    
    // Retornamos false para cancelar la activación de la ruta.
    return false;
  }
};