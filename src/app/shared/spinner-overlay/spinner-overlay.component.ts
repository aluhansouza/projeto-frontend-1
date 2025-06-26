import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-spinner-overlay',
    standalone: true,
    imports: [ProgressSpinnerModule, CommonModule],
    templateUrl: './spinner-overlay.component.html',
    styleUrl: './spinner-overlay.component.scss'
})
export class SpinnerOverlayComponent {
    @Input() visible: boolean = false;
}
