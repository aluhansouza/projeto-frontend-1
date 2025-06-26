import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/paginas/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'paginas', loadChildren: () => import('./app/paginas/paginas.routes') },
            { path: '', loadChildren: () => import('./app/recursos/dashboard/dashboard.routes') },
            { path: 'recursos', loadChildren: () => import('./app/recursos/recursos.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/recursos/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
