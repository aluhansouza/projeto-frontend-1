import { Routes } from '@angular/router';
import { Crud } from './cadastros/crud';
import { Empty } from './empty/empty';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';

export default [
    { path: 'crud', component: Crud },
    { path: 'cadastros/usuarios', component: UsuariosComponent },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' },



] as Routes;
