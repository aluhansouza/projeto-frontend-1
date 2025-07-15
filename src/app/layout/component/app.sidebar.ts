import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AppMenu],
  template: `
    <div class="layout-sidebar">
      <app-menu></app-menu>
    </div>
  `,
  styles: [`
    .layout-sidebar {
      height: 100vh;
      width: 280px;
      background: var(--surface-ground, #fff); /* Fundo neutro */

      
      // Opção 1: borda somente na direita
      border-right: 2px solid var(--primary-color);
      box-shadow: 2px 0 6px rgb(30 136 229 / 0.25);
      

      /*
      // Opção 2: borda completa ao redor da sidebar
      border: 2px solid var(--primary-color);
      box-shadow: 0 0 8px rgb(30 136 229 / 0.25);
      */

      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding: 0.5rem 0;
      box-sizing: border-box;
    }
  `]
})
export class AppSidebar {
  constructor(public el: ElementRef) {}
}
