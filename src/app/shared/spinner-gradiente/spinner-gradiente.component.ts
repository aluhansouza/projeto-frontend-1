import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-spinner-gradiente',
    standalone: true,
    imports: [CommonModule, ProgressSpinnerModule],
    templateUrl: './spinner-gradiente.component.html',
    styleUrl: './spinner-gradiente.component.scss'
})
export class SpinnerGradienteComponent {
    isLoading = signal(false); // Sinal para controlar o estado de carregamento

    // Função para alternar o spinner
    toggleSpinner() {
        this.isLoading.update((value) => !value);
    }
}
