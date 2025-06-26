import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MaterialTesteComponent } from './app/core/teste-conexao/material-teste/material-teste.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, MaterialTesteComponent],
    template: ` <p-toast></p-toast>
        <router-outlet></router-outlet><app-material-teste></app-material-teste>`
})
export class AppComponent {}
