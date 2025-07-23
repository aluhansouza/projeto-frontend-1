import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        console.warn('[AuthGuard] Usuário não autenticado.');
        return router.createUrlTree(['/auth/login']);
    }

    const userRoles = authService.getRoles();
    console.info('[AuthGuard] Roles do usuário:', userRoles);

    const requiredRoles = route.data?.['roles'] as string[] | undefined;

    if (requiredRoles && !requiredRoles.some((role) => userRoles.includes(role))) {
        console.warn('[AuthGuard] Acesso negado. Roles exigidas:', requiredRoles);
        return router.createUrlTree(['/auth/access']);
    }

    return true;
};
