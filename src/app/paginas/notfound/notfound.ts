import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
  template: `
    <app-floating-configurator />
    <div class="flex items-center justify-center min-h-screen overflow-hidden">
      <div class="flex flex-col items-center justify-center text-center px-4">
        <!-- IMAGEM CUSTOMIZADA EM VEZ DO SVG -->
        <img
          src="assets/image/logo.png"
          alt="Página não encontrada"
          class="w-[180px] h-auto mb-6 dark:invert"
        />

        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)"
        >
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
            <span class="text-primary font-bold text-3xl">404</span>
            <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Página não encontrada</h1>
            <div class="text-surface-600 dark:text-surface-200 mb-8">O recurso solicitado não está disponível.</div>

            <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
              <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                <i class="pi pi-fw pi-table !text-2xl"></i>
              </span>
              <span class="ml-6 flex flex-col">
                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Perguntas Frequentes</span>
                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Dúvidas comuns e respostas rápidas</span>
              </span>
            </a>

            <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
              <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                <i class="pi pi-fw pi-question-circle !text-2xl"></i>
              </span>
              <span class="ml-6 flex flex-col">
                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Central de Ajuda</span>
                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Tutoriais e soluções de problemas</span>
              </span>
            </a>

            <a routerLink="/" class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b">
              <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                <i class="pi pi-fw pi-unlock !text-2xl"></i>
              </span>
              <span class="ml-6 flex flex-col">
                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Gerenciador de Permissões</span>
                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Solicitar acesso ou permissões</span>
              </span>
            </a>

            <!-- Botão para o painel -->
            <p-button label="Ir para o Painel" routerLink="/" class="mb-3" />

            <!-- Botão de logout -->
            <p-button 
              label="Sair do Sistema" 
              icon="pi pi-sign-out" 
              severity="danger" 
              (onClick)="logout()" 
            />
          </div>
        </div>
      </div>
    </div>
  `
})
export class Notfound {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    localStorage.removeItem('authToken');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
