// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Bibliotecas externas
import QRCodeStyling from 'qr-code-styling';
import { finalize, delay } from 'rxjs';
import { forkJoin } from 'rxjs';
import { jsPDF } from "jspdf";

// Serviços
import { MaterialService } from '../../core/services/material.service';
import { SetorService } from '../../core/services/setor.service';
import { MarcaService } from '../../core/services/marca.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { OrigemService } from '../../core/services/origem.service';

// Models - API Responses
import { MaterialApiResponse } from '../../core/models/material/material-api-response.model';
import { SetorApiResponse } from '../../core/models/setor/setor-api-response.model';
import { MarcaApiResponse } from '../../core/models/marca/marca-api-response.model';
import { CategoriaApiResponse } from '../../core/models/categoria/categoria-api-response.model';
import { OrigemApiResponse } from '../../core/models/origem/origem-api-response.model';

// Models - DTOs
import { MaterialResponseDTO } from '../../core/models/material/materialresponsedto.model';
import { SetorResponseDTO } from '../../core/models/setor/setorresponsedto.model';
import { MarcaResponseDTO } from '../../core/models/marca/marcaresponsedto.model';
import { CategoriaResponseDTO } from '../../core/models/categoria/categoriaresponsedto.model';
import { OrigemResponseDTO } from '../../core/models/origem/origemresponsedto.model';
import { MaterialRequestDTO } from '../../core/models/material/materialrequestdto.model';

// Enums
import { Situacao } from '../../core/models/enums/situacao.materiais.enum';
import { TipoDepreciacao } from '../../core/models/enums/tipo-depreciacao.materiais.enum';

// Utilitários
import { toMaterialRequestDTO } from '../../core/models/material/material.mapper';
import { MaterialTesteComponent } from '../../core/teste-conexao/material-teste/material-teste.component';

// PrimeNG Services
import { MessageService, ConfirmationService } from 'primeng/api';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

// Componentes compartilhados
import { SpinnerGradienteComponent } from '../../shared/spinner-gradiente/spinner-gradiente.component';
import { SpinnerOverlayComponent } from '../../shared/spinner-overlay/spinner-overlay.component';





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
    MaterialTesteComponent,
  ]
})
export class MateriaisComponent implements OnInit {

  // ----- Variáveis e propriedades -----
  
  ptBrLocale: any;

  materiais: MaterialResponseDTO[] = [];
  selectedMateriais: MaterialResponseDTO[] = [];

  setores: SetorResponseDTO[] = [];
  marcas: MarcaResponseDTO[] = [];
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
    { label: 'Linear',    value: TipoDepreciacao.LINEAR },
    { label: 'Acelerada', value: TipoDepreciacao.ACELERADA }
  ];

  material: MaterialResponseDTO = this.criarMaterialVazio();

  materialDialog = false;
  materialVisualizarDialog = false;
  isEditando = false;
  submitted = false;

  carregando = false;
  loadingSalvar = false;
  loadingExcluir = false;
  loadingExcluirMassa = false;

  dragOver = false;

  imagemSelecionada: File | null = null;
  imagemPreview: string | ArrayBuffer | null = null;


  imagemDialogVisible = false;
  imagemSelecionadaUrl: string = '';

  qrDialogVisible = false;
  qrValorSelecionado: string = '';


  // ----- Constructor -----

  constructor(
    private materialService: MaterialService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private setorService: SetorService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private origemService: OrigemService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Configuração do locale pt-BR para datepicker etc
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


  // ----- Lifecycle -----

  ngOnInit(): void {
    this.carregarSetores();
    this.carregarMarcas();
    this.carregarCategorias();
    this.carregarOrigens();

    this.route.queryParams.subscribe(params => {
      const id = +params['editar'];
      if (id) {
        this.carregarMateriais(() => {
          this.abrirDialogEdicaoPorId(id);
        });
      } else {
        this.carregarMateriais();
      }
    });
  }


  // ----- Métodos de carregamento de dados -----

  carregarMateriais(depois?: () => void): void {
    this.carregando = true;
    this.materialService.listarTodos().subscribe({
      next: (dados: MaterialApiResponse) => {
        this.materiais = dados._embedded?.materiais || [];

        // Gerar QR codes para cada material
        setTimeout(() => {
          this.materiais.forEach(mat => {
            this.gerarQrCode(mat.id!, mat.qrValor || mat.nome);
          });

          if (depois) depois();
        }, 0);
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
      next: (dados /*: SetorApiResponse*/) => {
        this.setores = dados; // Se precisar usar _embedded, ajuste aqui
      },
      error: (err) => {
        console.error('Erro ao carregar setores', err);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  carregarMarcas(): void {
    this.carregando = true;
    this.marcaService.listarTodos().subscribe({
      next: (dados /*: MarcaApiResponse*/) => {
        this.marcas = dados; // Se precisar usar _embedded, ajuste aqui
      },
      error: (err) => {
        console.error('Erro ao carregar marcas', err);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }  

  carregarCategorias(): void {
    this.carregando = true;
    this.categoriaService.listarTodos().subscribe({
      next: (dados /*: CategoriaApiResponse*/) => {
        this.categorias = dados;
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
      next: (dados /*: OrigemApiResponse*/) => {
        this.origens = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar origens', err);
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }


  // ----- CRUD e manipulação -----

  criarMaterialVazio(): MaterialRequestDTO {
    return {
      nome: '',
      situacao: Situacao.DISPONIVEL,
      localizacaoFisica: '',
      identificacaoRecibo: '',
      patrimonio: '',
      tipoDepreciacao: TipoDepreciacao.LINEAR,
      percentualDepreciacao: 0,
      valorCompra: 0,
      valorAtual: 0,
      vidaUtilAnos: 0,
      numSerie: 0,
      modelo: '',
      categoriaId: 0,
      setorId: 0,
      marcaId: 0,
      origemId: 0,
    };
  }


novoMaterial(): void {
  this.material = this.criarMaterialVazio();
  this.isEditando = false;
  this.submitted = false;
  this.imagemPreview = null;  // limpar preview
  this.imagemSelecionada = null;  // limpar arquivo selecionado
  this.materialDialog = true;
}



editarMaterial(material: MaterialResponseDTO): void {
  this.material = toMaterialRequestDTO(material);
  this.material.id = material.id;

  this.isEditando = true;
  this.submitted = false;
  this.imagemSelecionada = null; // não tem nova imagem ainda

  // Define o preview com a URL da imagem atual (se existir)
  this.imagemPreview = material.imagemUrl || null;

  this.materialDialog = true;
}



  salvarMaterial(): void {
    this.submitted = true;

    if (!this.material.nome || !this.material.setorId || !this.material.marcaId || !this.material.categoriaId || !this.material.origemId) {
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

    formData.append('material', new Blob([JSON.stringify(materialData)], { type: 'application/json' }));

    if (this.imagemSelecionada) {
    formData.append('imagem', this.imagemSelecionada);
    }
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
        this.imagemSelecionada = null;
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

        const exclusoes = this.selectedMateriais
          .filter((m) => m.id !== undefined)
          .map((m) => this.materialService.excluir(m.id!));

        forkJoin(exclusoes).subscribe({
  next: () => {
    this.selectedMateriais = [];
    this.carregarMateriais();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Materiais excluídos com sucesso!' });
  },
  error: () => {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir materiais.' });
  },
  complete: () => {
    this.loadingExcluirMassa = false;
  }
})
      }
    });
  }


  // ----- Manipulação de arquivos -----

  onImagemSelecionada(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.imagemSelecionada = file;
    }
  }


  // ----- Validações de input -----

  onPatrimonioKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (!/[0-9]/.test(event.key) || input.value.length >= 12) {
      event.preventDefault();
    }
  }

  onReciboKeyPress(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }


  // ----- QR Code -----

 gerarQrCode(id: number, valor: string): void {
  const qr = new QRCodeStyling({
    width: 90,
    height: 90,
    data: valor,
    margin: 0,
    dotsOptions: { color: "#000", type: "extra-rounded" },
    backgroundOptions: { color: "#fff" },

    // Adiciona a logo do assets
    image: 'assets/image/logo.png',    // caminho relativo ao index.html do Angular
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      imageSize: 0.50  // 25% do tamanho do QR Code
    }
  });

  const container = document.getElementById('qr-' + id);
  if (container) {
    container.innerHTML = '';
    qr.append(container);
  }

  // Ajuste do estilo do canvas
  setTimeout(() => {
    const canvas = container?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      canvas.style.margin = '0';
      canvas.style.padding = '0';
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }, 100);


    // Garantir que o QR seja renderizado
    const canvasId = `qr-${id}`;
setTimeout(() => {
  const canvas = container?.querySelector('canvas') as HTMLCanvasElement;
  if (canvas) {
    canvas.style.margin = '0';
    canvas.style.padding = '0';
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }
}, 100);
  }


gerarQrCodeVisualizar(id: number, valor: string): void {
  const qr = new QRCodeStyling({
    width: 150,
    height: 150,
    data: valor,
    margin: 0,
    dotsOptions: { color: "#000", type: "extra-rounded" },
    backgroundOptions: { color: "#fff" },
    image: 'assets/image/logo.png',
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      imageSize: 0.50
    }
  });

  const container = document.getElementById('qr-visualizar');
  if (container) {
    container.innerHTML = '';
    qr.append(container);
  }
}



  // ----- Abertura de dialogs -----

  abrirDialogEdicaoPorId(id: number): void {
    const materialExistente = this.materiais.find(m => m.id === id);
    if (materialExistente) {
      this.editarMaterial(materialExistente);
    } else {
      this.materialService.buscarPorId(id).subscribe({
        next: (material) => {
          this.editarMaterial(material);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Material não encontrado!'
          });
        }
      });
    }

    // Remove ?editar=... da URL após abrir dialog
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true
    });
  }


  abrirVisualizarMaterial(material: MaterialResponseDTO): void {
    this.material = material;
    this.materialVisualizarDialog = true;

    setTimeout(() => {
      this.gerarQrCodeVisualizar(material.id!, material.qrValor || material.nome);
    }, 0);
  }


  // ----- Utilitários de UI -----

  abrirLink(url: string) {
    window.open(url, '_blank');
  }

  onGlobalFilter(table: any, event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    table.filterGlobal(input, 'contains');
  }

exportCSV(): void {
  if (!this.materiais.length) return;

  const header = [
    'ID',
    'Nome',
    'Descrição',
    'Setor',
    'Marca',
    'Categoria',
    'Origem',
    'modelo',
    'numserie',
    'Situação',
    'Patrimônio',
    'Valor Compra (R$)',
    'Valor Atual (R$)',
    'Valor Depreciado (R$)',
    'Percentual Depreciado (%)',
    'Tipo Depreciação',
    'Percentual Depreciação (%)',
    'Vida Útil (anos)',
    'Identificação Recibo',
    'Localização Física',
    'Data Aquisição',
    'Imagem URL',
    'QR Code'
  ];

  const rows = this.materiais.map(m => {
    const valorCompra = m.valorCompra ?? 0;
    const valorAtual = m.valorAtual ?? 0;
    const percentualDepreciacao = m.percentualDepreciacao ?? 0;
    const valorDepreciado = valorCompra - valorAtual;
    const percentualDepreciado = valorCompra
      ? ((valorDepreciado / valorCompra) * 100).toFixed(2)
      : '0.00';

    return [
      m.id ?? '',
      `"${m.nome ?? ''}"`,
      `"${m.descricao ?? ''}"`,
      `"${this.getNomeSetor(m.setorId)}"`,
      `"${this.getNomeMarca(m.marcaId)}"`,
      `"${this.getNomeCategoria(m.categoriaId)}"`,
      `"${this.getNomeOrigem(m.origemId)}"`,
      `"${m.modelo ?? ''}"`,
      `"${m.numSerie ?? ''}"`,
      `"${this.getLabelSituacao(m.situacao)}"`,
      `"${m.patrimonio ?? ''}"`,
      valorCompra.toFixed(2),
      valorAtual.toFixed(2),
      valorDepreciado.toFixed(2),
      percentualDepreciado,
      `"${m.tipoDepreciacao ?? ''}"`,
      percentualDepreciacao.toFixed(2),
      m.vidaUtilAnos ?? '',
      `"${m.identificacaoRecibo ?? ''}"`,
      `"${m.localizacaoFisica ?? ''}"`,
      m.dataAquisicao ? new Date(m.dataAquisicao).toLocaleDateString('pt-BR') : '',
      `"${m.imagemUrl ?? ''}"`,
      `"${m.qrValor ?? ''}"`
    ];
  });

  const csvContent = '\uFEFF' + [header.join(';'), ...rows.map(e => e.join(';'))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'materiais.csv';
  a.click();
  URL.revokeObjectURL(url);
}



situacaoToSeverity(situacao?: Situacao): 'success' | 'warn' | 'danger' | 'info' {
  switch (situacao) {
    case Situacao.DISPONIVEL: return 'success';
    case Situacao.EMPRESTADO: return 'info';
    case Situacao.MANUTENCAO: return 'warn';
    case Situacao.DANIFICADO:
    case Situacao.DESATIVADO: return 'danger';
    default: return 'info';
  }
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

getNomeSetor(setorId?: number): string {
  if (!setorId) return '-';
  const setor = this.setores.find(s => s.id === setorId);
  return setor ? setor.nome : '-';
}

getNomeMarca(marcaId?: number): string {
  if (!marcaId) return '-';
  const marca = this.marcas.find(s => s.id === marcaId);
  return marca ? marca.nome : '-';
}

getNomeCategoria(categoriaId?: number): string {
  if (!categoriaId) return '-';
  const categoria = this.categorias.find(c => c.id === categoriaId);
  return categoria ? categoria.nome : '-';
}

getNomeOrigem(origemId?: number): string {
  if (!origemId) return '-';
  const origem = this.origens.find(o => o.id === origemId);
  return origem ? origem.nome : '-';
}
getLabelSituacao(situacao?: Situacao): string {
  const situacaoEncontrada = this.situacoes.find(s => s.value === situacao);
  return situacaoEncontrada ? situacaoEncontrada.label : '-';
}

abrirImagemGrande(url: string): void {
  this.imagemSelecionadaUrl = url;
  this.imagemDialogVisible = true;
}

abrirQrCodeGrande(valor: string): void {
  this.qrValorSelecionado = valor;
  this.qrDialogVisible = true;

  setTimeout(() => {
    const container = document.getElementById('qr-ampliado');
    if (container) {
      container.innerHTML = '';
      const qr = new QRCodeStyling({
        width: 600,
        height: 600,
        data: valor,
        margin: 0,
        dotsOptions: { color: "#000", type: "rounded" },
        backgroundOptions: { color: "#fff" },

        image: 'assets/image/logo.png',  // logo do assets
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 0,
          imageSize: 0.5  // tamanho proporcional da logo
        }
      });
      qr.append(container);
    }
  }, 0);
}



 // Evento disparado quando arrastam um arquivo sobre a área
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  // Evento disparado quando o arquivo sai da área de drag
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  // Evento disparado ao soltar o arquivo na área
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processarArquivoSelecionado(file);
      event.dataTransfer.clearData();
    }
  }

  // Evento disparado ao selecionar arquivo via input (change)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processarArquivoSelecionado(input.files[0]);
    }
  }

  // Método interno para processar o arquivo selecionado
private processarArquivoSelecionado(file: File): void { 
  this.imagemSelecionada = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.imagemPreview = reader.result;
  };
  reader.readAsDataURL(file);

  console.log('Arquivo selecionado:', file);
}
regenerarQrCodes(): void {
  setTimeout(() => {
    this.materiais.forEach(mat => {
      const container = document.getElementById('qr-' + mat.id);
      if (container && container.children.length === 0) {
        this.gerarQrCode(mat.id!, mat.qrValor || mat.nome);
      }
    });
  }, 0);
}

exportarRelatorio(): void {
  const parametros = {
    tipoRelatorio: 'todos', 
  };

  this.materialService.exportarRelatorio(parametros).subscribe({
    next: (response) => {
      this.handleRelatorioExportado(response);
    },
    error: (err) => {
      console.error('Erro ao exportar relatório de todos os materiais', err);
    }
  });
}

exportarRelatorioSelecionados(): void {
  if (this.selectedMateriais.length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Nenhum material selecionado.'
    });
    return;
  }

  const parametros = {
    tipoRelatorio: 'selecionados', 
    materiaisIds: this.selectedMateriais.map(m => m.id) 
  };

  this.materialService.exportarRelatorio(parametros).subscribe({
    next: (response) => {
      this.handleRelatorioExportado(response);
    },
    error: (err) => {
      console.error('Erro ao exportar relatório dos materiais selecionados', err);
    }
  });
}


handleRelatorioExportado(response: any): void {
  const blob = new Blob([response], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'relatorio_materiais.pdf';
  link.click();
}




exportarQrCodesSelecionados(): void {
  const doc = new jsPDF();
  const qrWidth = 50;  // Tamanho reduzido do QR Code
  const qrHeight = 50;
  const margin = 10;   // Margem entre os QR Codes
  const colCount = 3;  // Número de colunas
  const rowCount = 5;  // Número de linhas
  let xPos = margin;
  let yPos = margin;
  let qrCount = 0;

  this.selectedMateriais.forEach((material, index) => {
    if (qrCount >= rowCount * colCount) return;  // Limitando a quantidade de QR Codes gerados (15 no total)

    // Gerar o QR Code
    const qrCodeContainer = document.getElementById(`qr-${material.id}`);
    const canvas = qrCodeContainer?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      doc.addImage(imageUrl, 'PNG', xPos, yPos, qrWidth, qrHeight);  // Adiciona o QR Code no PDF

      qrCount++;
      xPos += qrWidth + margin;  // Move para a próxima coluna

      // Se 3 QR Codes foram adicionados na linha, vai para a próxima linha
      if (qrCount % colCount === 0) {
        xPos = margin;
        yPos += qrHeight + margin;  // Move para a próxima linha
      }
    }
  });

  doc.save('qr-codes-selecionados.pdf');
}




exportarQrCodesTodos(): void {
  const doc = new jsPDF();
  const qrWidth = 50;  // Tamanho reduzido do QR Code
  const qrHeight = 50;
  const margin = 10;   // Margem entre os QR Codes
  const colCount = 3;  // Número de colunas
  const rowCount = 5;  // Número de linhas
  let xPos = margin;
  let yPos = margin;
  let qrCount = 0;

  this.materiais.forEach((material, index) => {
    if (qrCount >= rowCount * colCount) return;  // Limitando a quantidade de QR Codes gerados (15 no total)

    // Gerar o QR Code
    const qrCodeContainer = document.getElementById(`qr-${material.id}`);
    const canvas = qrCodeContainer?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      doc.addImage(imageUrl, 'PNG', xPos, yPos, qrWidth, qrHeight);  // Adiciona o QR Code no PDF

      qrCount++;
      xPos += qrWidth + margin;  // Move para a próxima coluna

      // Se 3 QR Codes foram adicionados na linha, vai para a próxima linha
      if (qrCount % colCount === 0) {
        xPos = margin;
        yPos += qrHeight + margin;  // Move para a próxima linha
      }
    }
  });

  doc.save('qr-codes-todos.pdf');
}





onRightClick(event: MouseEvent, material: MaterialResponseDTO): void {
  event.preventDefault();
  this.selectedMateriais.push(material);  // Adiciona o item na seleção
  this.showContextMenu(event);
}

showContextMenu(event: MouseEvent): void {
  const contextMenu = document.getElementById('context-menu');
  
  if (contextMenu) {
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
  }
}








}


