import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const rawToken = localStorage.getItem('token_tienda');
  const token = rawToken ? rawToken.replace(/"/g, '') : null;

  // 1. Si es tu Login local, pasa sin token
  if (req.url.includes('/api/auth/')) {
    return next(req);
  }

  // 2. ¡FUEGO AMIGO EVITADO! Si la petición va a DummyJSON, NO le mandamos token
  if (req.url.includes('dummyjson.com')) {
    return next(req);
  }

  // 3. Al resto de peticiones (a tu Java) sí le ponemos el traje "Bearer"
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};