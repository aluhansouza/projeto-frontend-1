import { Situacao } from '../enums/situacao.materiais.enum';
import { TipoDepreciacao } from '../enums/tipo-depreciacao.materiais.enum';

export interface MaterialRequestDTO {
    nome: string;
    situacao: Situacao;
    patrimonio: string;
    imagem_url?: string;
    categoriaId: number;
    setorId: number;
    origemId: number;
    localizacaoFisica?: string;
    dataAquisicao?: string;
    valorCompra: number;
    identificacaoRecibo?: string;
    qrValor?: string;
    descricao?: string;
    tipoDepreciacao: TipoDepreciacao;
    percentualDepreciacao: number;
    vidaUtilAnos: number;
    valorAtual: number;
}
