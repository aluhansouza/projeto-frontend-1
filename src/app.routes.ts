import { Routes } from '@angular/router';

// Layout principal
import { AppLayout } from './app/layout/component/app.layout';

// Páginas
import { Notfound } from './app/paginas/notfound/notfound';
import { SemPermissaoComponent } from './app/paginas/deny/sem-permissao.component';
import { Access } from './app/recursos/auth/access';

// Guard de autenticação
import { authGuard } from './app/core/services/auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./app/recursos/dashboard/dashboard.routes') },
      { path: 'paginas', loadChildren: () => import('./app/paginas/paginas.routes') },
      {
        path: 'recursos',
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMINISTRADOR'] }, // exemplo de proteção com role
        loadChildren: () => import('./app/recursos/recursos.routes')
      }
    ]
  },

  // Rotas fora do layout principal
  { path: 'auth', loadChildren: () => import('./app/recursos/auth/auth.routes') },
  { path: 'auth/access', component: Access }, // acesso negado por falta de role
  { path: 'sem-permissao', component: SemPermissaoComponent }, // usuário bloqueado
  { path: 'notfound', component: Notfound },

  // Rota coringa
  { path: '**', redirectTo: '/notfound' }
];
