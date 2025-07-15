import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    console.warn('[AuthGuard] Usuário não autenticado.');
    return router.createUrlTree(['/auth/login']);
  }

  const roles = authService.getRoles();
  console.info('[AuthGuard] Roles do usuário:', roles);

  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  if (requiredRoles && !authService.hasAnyRole(requiredRoles)) {
    console.warn('[AuthGuard] Acesso negado. Roles exigidas:', requiredRoles);
    return router.createUrlTree(['/auth/access']);
  }

  return true;
};
