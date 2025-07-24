import { Routes } from '@angular/router';

export default [
  {
    path: 'usuarios',
    loadChildren: () => import('../administrativo/usuarios/usuarios.routes').then(m => m.default)
  },
  {
    path: 'permissoes',
    loadChildren: () => import('../administrativo/permissoes/permissoes.routes').then(m => m.default)
  },

] as Routes;
