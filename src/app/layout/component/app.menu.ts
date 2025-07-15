import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
  {
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
  },
  {
    icon: 'pi pi-fw pi-briefcase',
    routerLink: ['/paginas'],
    items: [
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-users', // ícone mais genérico para usuários/cadastros
        items: [
          {
            label: 'Materiais',
            icon: 'pi pi-fw pi-box', // ícone caixa/equipamento
            routerLink: ['recursos/materiais']
          },
          {
            label: 'Extras',
            icon: 'pi pi-fw pi-tags', // ícone para categorias, setores, tags
            routerLink: ['/recursos/extra']
          },
          {
            label: 'Usuários',
            icon: 'pi pi-fw pi-user', // ícone usuário
            routerLink: ['/cadastros/usuarios/usuarios.component.ts']
          },
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/auth/login']
          },
          {
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            routerLink: ['/auth/error']
          },
          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/auth/access']
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/paginas/crud']
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/cadastros/crud']
          }
        ]
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        routerLink: ['/pages/notfound']
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        routerLink: ['/pages/empty']
      }
    ]
  }
];

    }
}
