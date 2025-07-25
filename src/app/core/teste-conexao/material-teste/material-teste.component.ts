import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';   // <-- IMPORTAR
import { MaterialService } from '../../services/material.service';

@Component({
    selector: 'app-material-teste',
    templateUrl: './material-teste.component.html',
    styleUrls: ['./material-teste.component.scss'],
    standalone: true,
    imports: [CommonModule]  // <-- INCLUIR CommonModule aqui
})
export class MaterialTesteComponent {
    mensagem: string = '';

    private materialService = inject(MaterialService);

    ngOnInit(): void {
        this.testarConexao();
    }

    testarConexao(): void {
        this.materialService.verificarConexao().subscribe({
            next: (response) => {
                this.mensagem = 'Conexão bem-sucedida: ' + response;
            },
            error: (error) => {
                this.mensagem = 'Erro de conexão: ' + error.message;
            }
        });
    }
}
