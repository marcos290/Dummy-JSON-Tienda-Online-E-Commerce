import { HttpInterceptorFn } from '@angular/common/http';

/**
 * INTERCEPTOR DE AUTENTICACIÓN (authInterceptor)
 * Este interceptor actúa como un mediador que inspecciona y modifica las peticiones HTTP
 * salientes para adjuntar el token JWT de forma automática.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Extraemos el token del LocalStorage
  const rawToken = localStorage.getItem('token_tienda');
  // LIMPIEZA TÉCNICA: Eliminamos las comillas que a veces añade JSON.stringify para evitar tokens inválidos
  const token = rawToken ? rawToken.replace(/"/g, '') : null;

  /**
   * 1. EXCEPCIÓN DE AUTH:
   * Si la petición va dirigida al registro o login de nuestra API local, 
   * no adjuntamos token, ya que el usuario aún no está autenticado.
   */
  if (req.url.includes('/api/auth/')) {
    return next(req);
  }

  /**
   * 2. CIBERSEGURIDAD - EVITAR FUEGO AMIGO:
   * Si la petición va a una API externa (DummyJSON), NO enviamos nuestro token.
   * Enviar nuestro JWT a servidores externos sería una vulnerabilidad grave de seguridad.
   */
  if (req.url.includes('dummyjson.com')) {
    return next(req);
  }

  /**
   * 3. INYECCIÓN DEL TOKEN (Bearer Strategy):
   * Para el resto de peticiones dirigidas a nuestro backend de Java, 
   * si tenemos un token, clonamos la petición y le añadimos la cabecera 'Authorization'.
   */
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        // Estándar Bearer: Es el formato que espera el JwtFilter en nuestro Spring Boot
        Authorization: `Bearer ${token}`
      }
    });
    // Enviamos la petición modificada (clonada) con el token adjunto
    return next(cloned);
  }

  // Si no hay token o no cumple condiciones, la petición sigue su curso normal
  return next(req);
};