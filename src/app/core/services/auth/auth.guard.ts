// src/app/core/services/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    return router.parseUrl('/auth/login'); // Redireciona para login
  }

  const roles = authService.getRoles(); // Decodifica os roles do JWT
  console.log('Roles do usuário:', roles);

  if (roles.includes('ROLE_ADMINISTRADOR')) {
    return true; // Permite o acesso
  }

  return router.parseUrl('/notfound'); // Ou outra página de "sem permissão"
};
