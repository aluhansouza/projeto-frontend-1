import { Component, OnInit } from '@angular/core';
import QRCodeStyling from 'qr-code-styling';

import { MaterialService } from '../../core/services/material.service';
import { SetorService } from '../../core/services/setor.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { OrigemService } from '../../core/services/origem.service';

import { MaterialApiResponse } from '../../core/models/material/material-api-response.model';
import { SetorApiResponse } from '../../core/models/setor/setor-api-response.model';
import { CategoriaApiResponse } from '../../core/models/categoria/categoria-api-response.model';
import { OrigemApiResponse } from '../../core/models/origem/origem-api-response.model';

import { MaterialResponseDTO } from '../../core/models/material/materialresponsedto.model'; // MaterialResponseDTO para resposta
import { SetorResponseDTO } from '../../core/models/setor/setorresponsedto.model';
import { CategoriaResponseDTO } from '../../core/models/categoria/categoriaresponsedto.model';
import { OrigemResponseDTO } from '../../core/models/origem/origemresponsedto.model';

import { MaterialRequestDTO } from '../../core/models/material/materialrequestdto.model'; // MaterialRequestDTO para enviar
import { toMaterialRequestDTO } from '../../core/models/material/material.mapper';
import { Situacao } from '../../core/models/enums/situacao.materiais.enum';
import { TipoDepreciacao } from '../../core/models/enums/tipo-depreciacao.materiais.enum';

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
    selector: 'app-materiais',
    standalone: true,
    templateUrl: './materiais.component.html',
    styleUrls: ['./materiais.component.scss'],
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

export class MateriaisComponent implements OnInit {
  ptBrLocale: any;
  materiais: MaterialResponseDTO[] = [];
  selectedMateriais: MaterialResponseDTO[] = [];
  setores: SetorResponseDTO[] = [];
  categorias: CategoriaResponseDTO[] = [];
  origens: OrigemResponseDTO[] = [];
  br: any;
  situacoes = [
    { label: 'Disponível', value: Situacao.DISPONIVEL },
    { label: 'Emprestado', value: Situacao.EMPRESTADO },
    { label: 'Danificado', value: Situacao.DANIFICADO },
    { label: 'Desativado', value: Situacao.DESATIVADO },
    { label: 'Manutenção', value: Situacao.MANUTENCAO }
  ];
  tipoDepreciacao = [
    { label: 'Linear',    value: TipoDepreciacao.LINEAR},
    { label: 'Acelerada', value: TipoDepreciacao.ACELERADA}
  ];


  material: MaterialResponseDTO = this.criarMaterialVazio();
  materialDialog = false;
  isEditando = false;
  submitted = false;

  carregando = false;
  loadingSalvar = false;
  loadingExcluir = false;
  loadingExcluirMassa = false;

 
constructor(
  private materialService: MaterialService,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
  private setorService: SetorService,
  private categoriaService: CategoriaService,
  private origemService: OrigemService,
  
) {
    this.br = {
      firstDayOfWeek: 0,
      dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
      ],
      monthNamesShort: [
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
        'jul', 'ago', 'set', 'out', 'nov', 'dez'
      ],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  

formularioValido(): boolean {
  return !!(
    this.material.nome &&
    this.material.setorId &&
    this.material.categoriaId &&
    this.material.origemId &&
    this.material.situacao
  );
}
    

  ngOnInit(): void {
    this.carregarMateriais();
    this.carregarSetores();
    this.carregarCategorias();
    this.carregarOrigens();
  }
  
carregarMateriais(): void {
  this.carregando = true;
  this.materialService.listarTodos().subscribe({
    next: (dados: MaterialApiResponse) => {
      this.materiais = dados._embedded.materiais;

      // Gera os QR Codes após os elementos estarem renderizados no DOM
      setTimeout(() => {
        this.materiais.forEach(mat => {
          this.gerarQrCode(mat.id!, mat.qrValor || mat.nome); // usa `qrValor` ou `nome`
        });
      }, 0); // 0ms já é suficiente na maioria dos casos
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao carregar os materiais!'
      });
    },
    complete: () => {
      this.carregando = false;
    }
  });
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


gerarQrCode(id: number, valor: string): void {
  const qr = new QRCodeStyling({
    width: 60,       // tamanho maior
    height: 60,
    data: valor,
    margin: 0,        // margem menor para menos borda branca
    dotsOptions: { color: "#000", type: "rounded" },
    backgroundOptions: { color: "#fff" }
  });

  const container = document.getElementById('qr-' + id);
  if (container) {
    container.innerHTML = ''; // limpa antes de gerar
    qr.append(container);
  }



  const canvasId = `qr-${id}`;
  setTimeout(() => {
    const canvasEl = document.getElementById(canvasId);
    if (canvasEl) {
      canvasEl.innerHTML = ''; // limpa caso já tenha algo
      qr.append(canvasEl);
    }
  });
}
  
   novoMaterial(): void {
    this.material = this.criarMaterialVazio();
    this.isEditando = false;
    this.submitted = false;
    this.materialDialog = true;
  }

    criarMaterialVazio(): MaterialRequestDTO {
        return {
            nome: '',
            situacao: Situacao.DISPONIVEL,
            localizacaoFisica: '',
            identificacaoRecibo: '',
            patrimonio: '',
            tipoDepreciacao: TipoDepreciacao.LINEAR, // Atribuindo o valor do enum aqui
            percentualDepreciacao: 0,
            valorCompra: 0,
            valorAtual: 0,
            vidaUtilAnos: 0,
            categoriaId: 0,
            setorId: 0,
            origemId: 0
        };
    }

 deletarMaterial(id: number): void {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este material?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluir = true;
                this.materialService
                    .excluir(id)
                    .pipe(finalize(() => (this.loadingExcluir = false)))
                    .subscribe({
                        next: () => {
                            this.carregarMateriais();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Material excluído com sucesso!',
                                life: 3000
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível excluir o material.',
                                life: 3000
                            });
                        }
                    });
            }
        });
    }

    excluirSelecionados(): void {
        if (this.selectedMateriais.length === 0) return;

        this.confirmationService.confirm({
            message: 'Deseja excluir os materiais selecionados?',
            header: 'Confirmação de exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-success',
            rejectButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loadingExcluirMassa = true;

                const exclusoes = this.selectedMateriais.filter((m) => m.id !== undefined).map((m) => this.materialService.excluir(m.id!));

                Promise.all(exclusoes.map((obs) => obs.toPromise()))
                    .then(() => {
                        this.selectedMateriais = [];
                        this.carregarMateriais();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Materiais excluídos com sucesso!',
                            life: 3000
                        });
                    })
                    .catch(() => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Erro ao excluir materiais selecionados.',
                            life: 3000
                        });
                    })
                    .finally(() => {
                        this.loadingExcluirMassa = false;
                    });
            }
        });
    }

    imagemSelecionada: File | null = null;

    onImagemSelecionada(event: any): void {
        const file = event.files?.[0];
        if (file) {
            this.imagemSelecionada = file;
        }
    }


onPatrimonioKeyPress(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  if (!/[0-9]/.test(event.key) || input.value.length >= 4) {
    event.preventDefault();
  }
}
onReciboKeyPress(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}




abrirLink(url: string) {
  window.open(url, '_blank');
}



  onGlobalFilter(table: any, event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    table.filterGlobal(input, 'contains');
  }


    exportCSV() {
        // Implementar exportação se necessário
    }






    editarMaterial(material: MaterialResponseDTO): void {
        // Cria o MaterialRequestDTO apenas com os dados que serão enviados ao backend
        this.material = toMaterialRequestDTO(material);
        this.material.id = material.id;

        this.isEditando = true;
        this.submitted = false;
        this.materialDialog = true;
    }

      
    salvarMaterial(): void {
        this.submitted = true;

        // Validação de campos obrigatórios
        if (!this.material.nome || !this.material.setorId || !this.material.categoriaId || !this.material.origemId ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Aviso',
                detail: 'Preencha todos os campos obrigatórios.'
            });
            return;
        }

        this.loadingSalvar = true;
        let acao;
        const materialData: MaterialRequestDTO = toMaterialRequestDTO(this.material);
        const formData = new FormData();

        // Adiciona todos os campos do material ao FormData
        Object.entries(materialData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as string | Blob);
            }
        });

        // Se houver imagem selecionada, adiciona ao FormData
        if (this.imagemSelecionada) {
            formData.append('imagem', this.imagemSelecionada);
        }

        // Se for edição, usamos o método de atualização; se for novo, usamos o cadastro
        if (this.isEditando) {
            acao = this.materialService.atualizarComImagem(this.material.id!, formData);
        } else {
            acao = this.materialService.cadastrarComImagem(formData);

        }

        acao.pipe(
            delay(1000),
            finalize(() => (this.loadingSalvar = false))
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: `Material ${this.isEditando ? 'atualizado' : 'cadastrado'} com sucesso!`
                });
                this.materialDialog = false;
                this.carregarMateriais();
                this.imagemSelecionada = null; // Limpa a imagem após salvar
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Não foi possível ${this.isEditando ? 'atualizar' : 'cadastrar'} o material.`
                });
            }
        });
    }
    
    situacaoToSeverity(situacao: Situacao): 'success' | 'warn' | 'danger' | 'info' {
        switch (situacao) {
            case Situacao.DISPONIVEL: return 'success';
            case Situacao.EMPRESTADO: return 'info';
            case Situacao.MANUTENCAO: return 'warn';
            case Situacao.DANIFICADO:
                case Situacao.DESATIVADO: return 'danger';
                default: return 'info';
            }
        }
}
        






















