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
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Materiais',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/recursos/materiais']
          },
          {
            label: 'Extras',
            icon: 'pi pi-fw pi-tags',
            routerLink: ['/recursos/extra']
          },
          {
            label: 'Usuários',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/cadastros/usuarios']
          },
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/auth/login']
          },
          {
            label: 'Erro de Sistema',
            icon: 'pi pi-fw pi-times-circle',
            routerLink: ['/auth/error']
          },
          {
            label: 'Acesso Negado',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/auth/access']
          },
          {
            label: 'Bloqueado',
            icon: 'pi pi-fw pi-ban',
            routerLink: ['/sem-permissao']
          },
          {
            label: 'CRUD',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/paginas/crud']
          },
          {
            label: 'CRUD Alternativo',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/cadastros/crud']
          }
        ]
      },
      {
        label: 'Página Não Encontrada',
        icon: 'pi pi-fw pi-exclamation-circle',
        routerLink: ['/notfound']
      },
      {
        label: 'Página Vazia',
        icon: 'pi pi-fw pi-circle-off',
        routerLink: ['/pages/empty']
      }
    ]
  }
];

    }
}
