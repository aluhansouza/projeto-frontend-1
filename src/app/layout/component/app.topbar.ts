import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNG
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

// Serviços e componentes
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    MenuModule,
    AvatarModule,
    ButtonModule,
    AppConfigurator
  ],
  template: `
    <div class="layout-topbar flex justify-between items-center px-4 py-2 bg-surface-0 shadow-md dark:bg-surface-900">
      <!-- LOGO -->
      <div class="flex items-center gap-3">
        <button class="p-button p-button-text text-xl" (click)="layoutService.onMenuToggle()" aria-label="Abrir menu">
          <i class="pi pi-bars"></i>
        </button>

        <a class="flex items-center gap-3 text-primary font-bold" routerLink="/">
          <img src="assets/image/logo.png" alt="Logo" class="h-10 w-auto" />
          <span class="text-2xl">Sistema Encontro das Águas</span>
        </a>
      </div>

      <!-- AÇÕES -->
      <div class="flex items-center gap-4">
        <!-- Botão Tema -->
        <button class="p-button p-button-text text-xl" (click)="toggleDarkMode()" aria-label="Alternar tema">
          <i [ngClass]="layoutService.isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'"></i>
        </button>

        <!-- Configurador -->
        <div class="relative">
          <button
            class="p-button p-button-text text-xl"
            pStyleClass="@next"
            enterFromClass="hidden"
            enterActiveClass="animate-scalein"
            leaveToClass="hidden"
            leaveActiveClass="animate-fadeout"
            [hideOnOutsideClick]="true"
            aria-label="Abrir configurador"
          >
            <i class="pi pi-palette"></i>
          </button>
          <app-configurator />
        </div>

        <!-- Atalhos -->
        <button class="p-button p-button-text text-xl" (click)="goTo('/calendario')" aria-label="Calendário">
          <i class="pi pi-calendar"></i>
        </button>

        <button class="p-button p-button-text text-xl" (click)="goTo('/mensagens')" aria-label="Mensagens">
          <i class="pi pi-inbox"></i>
        </button>

        <!-- Avatar e Menu -->
        <p-menu #userMenu [popup]="true" [model]="userMenuItems"></p-menu>
        <button class="p-button p-button-text flex items-center gap-2" (click)="userMenu.toggle($event)" aria-label="Perfil do usuário">
          <p-avatar shape="circle" size="large" styleClass="bg-primary text-white" icon="pi pi-user"></p-avatar>
          <i class="pi pi-angle-down text-xs"></i>
        </button>

        <!-- Botão de logout visível -->
        <button class="p-button p-button-danger text-sm px-3 py-2 flex items-center gap-2" (click)="logout()" aria-label="Sair">
          <i class="pi pi-sign-out text-xl"></i>
          <span>Sair</span>
        </button>
      </div>
    </div>
  `
})
export class AppTopbar {
  userMenuItems: MenuItem[] = [
    {
      label: 'Editar Perfil',
      icon: 'pi pi-user-edit',
      command: () => this.goToProfile()
    }
  ];

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    localStorage.removeItem('authToken');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  goToProfile() {
    this.router.navigate(['/perfil/editar']);
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update(state => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }
}
