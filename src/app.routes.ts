import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/paginas/notfound/notfound';
import { authGuard } from './app/core/services/auth/auth.guard';

import { DashboardComponent } from './app/recursos/dashboard/dashboard.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./app/recursos/dashboard/dashboard.routes') },
      { path: 'paginas', loadChildren: () => import('./app/paginas/paginas.routes') },
      { path: 'recursos', canActivate: [authGuard], loadChildren: () => import('./app/recursos/recursos.routes') },
    ]
  },
  { path: 'auth', loadChildren: () => import('./app/recursos/auth/auth.routes') },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' }
];
