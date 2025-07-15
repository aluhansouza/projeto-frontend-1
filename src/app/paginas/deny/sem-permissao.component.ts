import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sem-permissao',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, AppFloatingConfigurator],
  template: `
    <app-floating-configurator />
    <div class="flex items-center justify-center min-h-screen overflow-hidden">
      <div class="flex flex-col items-center text-center px-4">
        <img src="assets/image/logo.png" alt="Acesso negado" class="w-[180px] h-auto mb-6 dark:invert" />

        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
            <span class="text-primary font-bold text-3xl mb-2">Acesso Negado</span>
            <h1 class="text-surface-900 dark:text-surface-0 font-bold text-2xl lg:text-4xl mb-2">
              Você não tem permissão para acessar esta página.
            </h1>
            <div class="text-surface-600 dark:text-surface-200 mb-8">Fale com o administrador do sistema se acredita que isso é um erro.</div>

            <p-button label="Voltar para o Início" icon="pi pi-home" routerLink="/" class="mb-3" />
            <p-button label="Sair do Sistema" icon="pi pi-sign-out" severity="danger" (onClick)="logout()" />
          </div>
        </div>
      </div>
    </div>
  `
})
export class SemPermissaoComponent {
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
}
