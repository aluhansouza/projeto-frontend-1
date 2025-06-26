import { Component, OnInit } from '@angular/core';

import { SetorService } from '../../core/services/setor.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { OrigemService } from '../../core/services/origem.service';

import { SetorApiResponse } from '../../core/models/setor/setor-api-response.model';
import { CategoriaApiResponse } from '../../core/models/categoria/categoria-api-response.model';
import { OrigemApiResponse } from '../../core/models/origem/origem-api-response.model';

import { SetorResponseDTO } from '../../core/models/setor/setorresponsedto.model';              //ResponseDTO para resposta
import { CategoriaResponseDTO } from '../../core/models/categoria/categoriaresponsedto.model';
import { OrigemResponseDTO } from '../../core/models/origem/origemresponsedto.model';

import { SetorRequestDTO } from '../../core/models/setor/setorrequestdto.model';                //RequestDTO para enviar
import { CategoriaRequestDTO } from '../../core/models/categoria/categoriarequestdto.model';
import { OrigemRequestDTO } from '../../core/models/origem/origemrequestdto.model';

import { toSetorRequestDTO } from '../../core/models/setor/setor.mapper';
import { toCategoriaRequestDTO } from '../../core/models/categoria/categoria.mapper';
import { toOrigemRequestDTO } from '../../core/models/origem/origem.mapper';

import { MessageService, ConfirmationService } from 'primeng/api';
import { finalize, delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SpinnerGradienteComponent } from '../../shared/spinner-gradiente/spinner-gradiente.component';
import { SpinnerOverlayComponent } from '../../shared/spinner-overlay/spinner-overlay.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';


@Component({
    selector: 'app-extra',
    standalone: true,
    templateUrl: './extra.component.html',
    styleUrls: ['./extra.component.scss'],
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
        ProgressSpinnerModule,
        IconFieldModule,
        InputIconModule,

        DatePickerModule,
        FileUploadModule,
        SelectModule,
        
    ]
})

export class ExtraComponent implements OnInit {
  ptBrLocale: any;
  setores: SetorResponseDTO[] = [];
  categorias: CategoriaResponseDTO[] = [];
  origens: OrigemResponseDTO[] = [];

  selectedSetores: SetorResponseDTO[] = [];
  selectedCategorias: CategoriaResponseDTO[] = [];
  selectedOrigens: OrigemResponseDTO[] = [];

  setor: SetorResponseDTO = this.criarSetorVazio();
  categoria: CategoriaResponseDTO = this.criarCategoriaVazio();
  origem: OrigemResponseDTO = this.criarOrigemVazio();

  setorDialog = false;
  categoriaDialog = false;
  origemDialog = false;

  isEditando = false;
  submitted = false;
  carregando = false;
  loadingSalvar = false;
  loadingExcluir = false;
  loadingExcluirMassa = false;
  
  constructor(
  private setorService: SetorService,
  private categoriaService: CategoriaService,
  private origemService: OrigemService,
  private messageService: MessageService,
  private confirmationService: ConfirmationService,
) {}

formularioValidoSetor(): boolean {
  return !!(
    this.setor.nome
  );
}

formularioValidoCategoria(): boolean {
  return !!(
    this.categoria.nome
  );
}

formularioValidoOrigem(): boolean {
  return !!(
    this.origem.nome
  );
}

  ngOnInit(): void {
    this.carregarSetores();
    this.carregarCategorias();
    this.carregarOrigens();
  }

 carregarSetores(): void {
  this.carregando = true;
  this.setorService.listarTodos().subscribe({
    next: (dados/*: SetorApiResponse*/) => {
      console.log(dados);
      this.setores = dados/*._embedded.setores*/;
    },
    error: (err) => {
      console.error('Erro ao carregar setores', err);
    },
    complete: () => {
      this.carregando = false;
    }
  });
}


 carregarCategorias(): void {
  this.carregando = true;
  this.categoriaService.listarTodos().subscribe({
    next: (dados/*: CategoriaApiResponse*/) => {
      console.log(dados);
      this.categorias = dados/*._embedded.setores*/;
    },
    error: (err) => {
      console.error('Erro ao carregar categorias', err);
    },
    complete: () => {
      this.carregando = false;
    }
  });
}

 carregarOrigens(): void {
  this.carregando = true;
  this.origemService.listarTodos().subscribe({
    next: (dados/*: OrigemApiResponse*/) => {
      console.log(dados);
      this.origens = dados/*._embedded.origens*/;
    },
    error: (err) => {
      console.error('Erro ao carregar origens', err);
    },
    complete: () => {
      this.carregando = false;
    }
  });
}

    novoSetor(): void {
        this.setor = this.criarSetorVazio();
        this.isEditando = false;
        this.submitted = false;
        this.setorDialog = true;
    }

    novoCategoria(): void {
        this.categoria = this.criarCategoriaVazio();
        this.isEditando = false;
        this.submitted = false;
        this.categoriaDialog = true;
    }

    novoOrigem(): void {
        this.origem = this.criarOrigemVazio();
        this.isEditando = false;
        this.submitted = false;
        this.origemDialog = true;
    }

    criarSetorVazio(): SetorRequestDTO {
        return {
            nome: ''
        };
    }

    criarCategoriaVazio(): CategoriaRequestDTO {
        return {
            nome: ''
        };
    }
    
    criarOrigemVazio(): OrigemRequestDTO {
        return {
            nome: ''
        };
    }

    deletarSetor(id: number): void {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este Setor?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluir = true;
                this.setorService
                    .excluir(id)
                    .pipe(finalize(() => (this.loadingExcluir = false)))
                    .subscribe({
                        next: () => {
                            this.carregarSetores();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Setor excluído com sucesso!',
                                life: 3000
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível excluir o setor.',
                                life: 3000
                            });
                        }
                    })
            }
        });
    }

    deletarCategoria(id: number): void {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir esta Categoria?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluir = true;
                this.categoriaService
                    .excluir(id)
                    .pipe(finalize(() => (this.loadingExcluir = false)))
                    .subscribe({
                        next: () => {
                            this.carregarCategorias();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Categoria excluída com sucesso!',
                                life: 3000
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível excluir a categoria.',
                                life: 3000
                            });
                        }
                    })
            }
        });
    }
    
    deletarOrigem(id: number): void {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir esta Origem?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluir = true;
                this.origemService
                    .excluir(id)
                    .pipe(finalize(() => (this.loadingExcluir = false)))
                    .subscribe({
                        next: () => {
                            this.carregarOrigens();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Origem excluída com sucesso!',
                                life: 3000
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível excluir a origem.',
                                life: 3000
                            });
                        }
                    })
            }
        });
    }
    
excluirSetoresSelecionados(): void {
  if (this.selectedSetores.length === 0) return;

  this.confirmationService.confirm({
    message: 'Deseja excluir os setores selecionados?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    acceptButtonStyleClass: 'p-button-success',
    rejectButtonStyleClass: 'p-button-danger',
    accept: () => {
      this.loadingExcluirMassa = true;

      const exclusoes = this.selectedSetores
        .filter(s => s.id !== undefined)
        .map(s => this.setorService.excluir(s.id!));

      Promise.all(exclusoes.map(obs => obs.toPromise()))
        .then(() => {
          this.selectedSetores = [];
          this.carregarSetores();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Setores excluídos com sucesso!',
            life: 3000
          });
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir setores selecionados.',
            life: 3000
          });
        })
        .finally(() => {
          this.loadingExcluirMassa = false;
        });
    }
  });
}

excluirCategoriasSelecionadas(): void {
  if (this.selectedCategorias.length === 0) return;

  this.confirmationService.confirm({
    message: 'Deseja excluir as categorias selecionadas?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    acceptButtonStyleClass: 'p-button-success',
    rejectButtonStyleClass: 'p-button-danger',
    accept: () => {
      this.loadingExcluirMassa = true;

      const exclusoes = this.selectedCategorias
        .filter(c => c.id !== undefined)
        .map(c => this.categoriaService.excluir(c.id!));

      Promise.all(exclusoes.map(obs => obs.toPromise()))
        .then(() => {
          this.selectedCategorias = [];
          this.carregarCategorias();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Categorias excluídas com sucesso!',
            life: 3000
          });
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir categorias selecionadas.',
            life: 3000
          });
        })
        .finally(() => {
          this.loadingExcluirMassa = false;
        });
    }
  });
}

excluirOrigensSelecionadas(): void {
  if (this.selectedOrigens.length === 0) return;

  this.confirmationService.confirm({
    message: 'Deseja excluir as origens selecionadas?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    acceptButtonStyleClass: 'p-button-success',
    rejectButtonStyleClass: 'p-button-danger',
    accept: () => {
      this.loadingExcluirMassa = true;

      const exclusoes = this.selectedOrigens
        .filter(o => o.id !== undefined)
        .map(o => this.origemService.excluir(o.id!));

      Promise.all(exclusoes.map(obs => obs.toPromise()))
        .then(() => {
          this.selectedOrigens = [];
          this.carregarOrigens();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Origens excluídas com sucesso!',
            life: 3000
          });
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir origens selecionadas.',
            life: 3000
          });
        })
        .finally(() => {
          this.loadingExcluirMassa = false;
        });
    }
  });
}

    editarSetor(setor: SetorResponseDTO): void {
        // Cria o SetorRequestDTO apenas com os dados que serão enviados ao backend
        this.setor = toSetorRequestDTO(setor);
        this.setor.id = setor.id;

        this.isEditando = true;
        this.submitted = false;
        this.setorDialog = true;
    }

    editarCategoria(categoria: CategoriaResponseDTO): void {
        // Cria o categoriaRequestDTO apenas com os dados que serão enviados ao backend
        this.categoria = toCategoriaRequestDTO(categoria);
        this.categoria.id = categoria.id;

        this.isEditando = true;
        this.submitted = false;
        this.categoriaDialog = true;
    }

    editarOrigem(origem: OrigemResponseDTO): void {
        // Cria o OrigemRequestDTO apenas com os dados que serão enviados ao backend
        this.origem = toOrigemRequestDTO(origem);
        this.origem.id = origem.id;

        this.isEditando = true;
        this.submitted = false;
        this.origemDialog = true;
    }

salvarSetor(): void {
  this.submitted = true;

  if (!this.setor.nome) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Preencha todos os campos obrigatórios.'
    });
    return;
  }

  this.loadingSalvar = true;
  const setorData: SetorRequestDTO = toSetorRequestDTO(this.setor);
  let acao;

  if (this.isEditando && this.setor.id) {
    acao = this.setorService.atualizar(this.setor.id, setorData);
  } else {
    acao = this.setorService.cadastrar(setorData);
  }

  acao.pipe(
    delay(1000),
    finalize(() => (this.loadingSalvar = false))
  ).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Setor ${this.isEditando ? 'atualizado' : 'cadastrado'} com sucesso!`
      });
      this.setorDialog = false;
      this.carregarSetores();
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Não foi possível ${this.isEditando ? 'atualizar' : 'cadastrar'} o setor.`
      });
    }
  });
}

salvarCategoria(): void {
  this.submitted = true;

  if (!this.categoria.nome) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Preencha todos os campos obrigatórios.'
    });
    return;
  }

  this.loadingSalvar = true;
  const categoriaData: CategoriaRequestDTO = toCategoriaRequestDTO(this.categoria);
  let acao;

  if (this.isEditando && this.categoria.id) {
    acao = this.categoriaService.atualizar(this.categoria.id, categoriaData);
  } else {
    acao = this.categoriaService.cadastrar(categoriaData);
  }

  acao.pipe(
    delay(1000),
    finalize(() => (this.loadingSalvar = false))
  ).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Categoria ${this.isEditando ? 'atualizada' : 'cadastrada'} com sucesso!`
      });
      this.categoriaDialog = false;
      this.carregarCategorias();
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Não foi possível ${this.isEditando ? 'atualizar' : 'cadastrar'} a categoria.`
      });
    }
  });
}

salvarOrigem(): void {
  this.submitted = true;

  if (!this.origem.nome) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Preencha todos os campos obrigatórios.'
    });
    return;
  }

  this.loadingSalvar = true;
  const origemData: OrigemRequestDTO = toOrigemRequestDTO(this.origem);
  let acao;

  if (this.isEditando && this.origem.id) {
    acao = this.origemService.atualizar(this.origem.id, origemData);
  } else {
    acao = this.origemService.cadastrar(origemData);
  }

  acao.pipe(
    delay(1000),
    finalize(() => (this.loadingSalvar = false))
  ).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Origem ${this.isEditando ? 'atualizada' : 'cadastrada'} com sucesso!`
      });
      this.origemDialog = false;
      this.carregarOrigens();
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `Não foi possível ${this.isEditando ? 'atualizar' : 'cadastrar'} a origem.`
      });
    }
  });
}

  onGlobalFilter(table: any, event: Event): void {
    const input = (event.target as HTMLInputElement).value;  
    table.filterGlobal(input, 'contains');
  }

    exportCSV() {
        // Implementar exportação se necessário
    }    

}
