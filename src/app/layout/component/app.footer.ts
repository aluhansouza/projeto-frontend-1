import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <div class="layout-footer flex justify-center items-center px-4 py-2 bg-surface-0 shadow-md dark:bg-surface-900">
      <span class="text-primary font-bold">
        Suporte TV e Rádio Encontro das Águas
      </span>
    </div>
  `
})
export class AppFooter {}
