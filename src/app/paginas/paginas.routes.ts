import { Routes } from '@angular/router';
import { Crud } from './cadastros/crud';
import { Empty } from './empty/empty';


export default [
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
     {
    path: 'usuarios',
    loadChildren: () => import('./cadastros/usuarios/usuarios.routes').then(m => m.default)
  }


] as Routes;





 
