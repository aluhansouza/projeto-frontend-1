import { Routes } from '@angular/router';

export default [
  {
    path: 'usuarios',
    loadChildren: () => import('../paginas/cadastros/usuarios/usuarios.routes').then(m => m.default)
  },
  {
    path: 'materiais',
    loadChildren: () => import('./materiais/materiais.routes').then(m => m.default)
  },
  {
    path: 'extra',
    loadChildren: () => import('./extras/extra.routes').then(m => m.default)
  }
] as Routes;
