import { Situacao } from '../enums/situacao.materiais.enum';
import { TipoDepreciacao } from '../enums/tipo-depreciacao.materiais.enum';
import { SetorResponseDTO } from '../setor/setorresponsedto.model';
import { CategoriaResponseDTO } from '../categoria/categoriaresponsedto.model';
import { OrigemResponseDTO } from '../origem/origemresponsedto.model';

export interface MaterialResponseDTO {
  id?: number;
  nome: string;
  situacao?: Situacao;
  patrimonio?: string;
  imagemUrl? :string;
  categoriaId?: number;
  setorId?: number;
  origemId?: number;
  localizacaoFisica?: string;
  dataAquisicao?: string;
  descricao?: string;
  valorCompra?: number;
  identificacaoRecibo?: string;
  qrValor?: string;
  tipoDepreciacao?: TipoDepreciacao;
  percentualDepreciacao?: number;
  vidaUtilAnos?: number;
  valorAtual?: number;

  categoria?: CategoriaResponseDTO;
  setor?: SetorResponseDTO;
  origem?: OrigemResponseDTO;
}