import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.model';
import { Perfil } from '../../../core/models/perfil.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerGradienteComponent } from '../../../shared/spinner-gradiente/spinner-gradiente.component';
import { SpinnerOverlayComponent } from '../../../shared/spinner-overlay/spinner-overlay.component';
import { finalize, delay } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinner } from 'primeng/progressspinner';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        TableModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        ConfirmDialogModule,
        SpinnerGradienteComponent,
        SpinnerOverlayComponent,
        ProgressSpinner,
        IconFieldModule,
        InputIconModule
    ]
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    perfis: Perfil[] = [];
    selectedUsuarios: Usuario[] = [];
    usuario: Usuario = this.criarUsuarioVazio();
    usuarioDialog = false;
    isEditando = false;
    submitted = false;

    carregando = false;
    loadingSalvar = false;
    loadingExcluir = false;
    loadingExcluirMassa = false;

    constructor(
        private usuarioService: UsuarioService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.carregarUsuarios();
        this.carregarPerfis();
    }

    formularioValido(): boolean {
        return !!(this.usuario.nome && this.usuario.email && (this.isEditando || this.usuario.senha) && this.usuario.perfilId);
    }

    carregarUsuarios(): void {
        this.carregando = true;
        this.usuarioService
            .listarTodos()
            .pipe(finalize(() => (this.carregando = false)))
            .subscribe({
                next: (dados) => (this.usuarios = dados),
                error: (err) => {
                    console.error('Erro ao carregar usuários:', err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Falha ao carregar os usuários!'
                    });
                }
            });
    }

    carregarPerfis(): void {
        this.usuarioService.listarTodosPerfis().subscribe({
            next: (dados) => (this.perfis = dados),
            error: (err) => console.error('Erro ao carregar perfis:', err)
        });
    }

    novoUsuario(): void {
        this.usuario = this.criarUsuarioVazio();
        this.isEditando = false;
        this.usuarioDialog = true;
    }

    editarUsuario(usuario: Usuario): void {
        this.usuario = {
            ...usuario,
            perfilId: this.perfis.find((p) => p.nome === usuario.perfilNome)?.id || null
        };
        this.isEditando = true;
        this.usuarioDialog = true;
    }

    salvarUsuario(): void {
        this.submitted = true;

        if (!this.usuario.nome || !this.usuario.email || (!this.isEditando && !this.usuario.senha)) {
            return;
        }

        this.loadingSalvar = true;
        const acao = this.isEditando ? this.usuarioService.atualizar(this.usuario.id!, this.usuario) : this.usuarioService.cadastrar(this.usuario);

        acao.pipe(
            delay(1000),
            finalize(() => (this.loadingSalvar = false))
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: `Usuário ${this.isEditando ? 'atualizado' : 'cadastrado'} com sucesso!`
                });
                this.usuarioDialog = false;
                this.carregarUsuarios();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Não foi possível ${this.isEditando ? 'atualizar' : 'cadastrar'} o usuário.`
                });
            }
        });
    }

    deletarUsuario(id: number): void {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este usuário?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluir = true;
                this.usuarioService
                    .excluir(id)
                    .pipe(finalize(() => (this.loadingExcluir = false)))
                    .subscribe({
                        next: () => {
                            this.carregarUsuarios();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Usuário excluído com sucesso!',
                                life: 3000
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível excluir o usuário.',
                                life: 3000
                            });
                        }
                    });
            }
        });
    }

    excluirSelecionados(): void {
        if (this.selectedUsuarios.length === 0) return;

        this.confirmationService.confirm({
            message: 'Deseja excluir os usuários selecionados?',
            header: 'Confirmação de exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluirMassa = true;

                const exclusoes = this.selectedUsuarios.filter((u) => u.id !== undefined).map((u) => this.usuarioService.excluir(u.id!));

                Promise.all(exclusoes.map((obs) => obs.toPromise()))
                    .then(() => {
                        this.selectedUsuarios = [];
                        this.carregarUsuarios();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Usuários excluídos com sucesso!',
                            life: 3000
                        });
                    })
                    .catch(() => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao excluir usuários selecionados.',
                            life: 3000
                        });
                    })
                    .finally(() => {
                        this.loadingExcluirMassa = false;
                    });
            }
        });
    }

    criarUsuarioVazio(): Usuario {
        return {
            id: undefined,
            nome: '',
            email: '',
            senha: '',
            perfilNome: ''
        };
    }

    compararPerfis(p1: any, p2: any): boolean {
        return p1 && p2 ? p1.id === p2.id : p1 === p2;
    }

    onGlobalFilter(table: any, event: Event): void {
        const input = (event.target as HTMLInputElement).value;
        table.filterGlobal(input, 'contains');
    }

    exportCSV() {
        // Implementar exportação se necessário
    }
}
