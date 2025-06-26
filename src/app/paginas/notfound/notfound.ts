import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
    template: ` <app-floating-configurator />
        <div class="flex items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <svg viewBox="0 0 1024 1024"  width="100" height="100" xmlns="http://www.w3.org/2000/svg" fill="none">
        <!-- LINHA PRINCIPAL -->
        <path
            d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 
               11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 
               278.4 278.4 276.8-153.6 6.4 12.8z"
            fill="var(--text-color)"
        />

        <!-- MÁSCARA DAS BOLINHAS -->
        <mask id="mask-bolinhas" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
            <path
                d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z 
                   m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z 
                   m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z 
                   m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z 
                   m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z 
                   m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40z 
                   M736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z"
                fill="white"
            />
        </mask>

        <!-- BOLINHAS COLORIDAS USANDO A MÁSCARA -->
        <g mask="url(#mask-bolinhas)">
            <rect width="1024" height="1024" fill="var(--primary-color)" />
        </g>
    </svg>
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <span class="text-primary font-bold text-3xl">404</span>
                        <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>
                        <div class="text-surface-600 dark:text-surface-200 mb-8">Requested resource is not available.</div>
                        <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-table !text-2xl"></i>
                            </span>
                            <span class="ml-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Frequently Asked Questions</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Ultricies mi quis hendrerit dolor.</span>
                            </span>
                        </a>
                        <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-question-circle !text-2xl"></i>
                            </span>
                            <span class="ml-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Solution Center</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Phasellus faucibus scelerisque eleifend.</span>
                            </span>
                        </a>
                        <a routerLink="/" class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b">
                            <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-unlock !text-2xl"></i>
                            </span>
                            <span class="ml-6 flex flex-col">
                                <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Permission Manager</span>
                                <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Accumsan in nisl nisi scelerisque</span>
                            </span>
                        </a>
                        <p-button label="Go to Dashboard" routerLink="/" />
                    </div>
                </div>
            </div>
        </div>`
})
export class Notfound {}
