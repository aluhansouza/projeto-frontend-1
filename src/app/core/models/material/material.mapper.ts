import { MaterialRequestDTO } from './materialrequestdto.model';
import { MaterialResponseDTO } from './materialresponsedto.model';
import { Situacao } from '../enums/situacao.materiais.enum';
import { TipoDepreciacao } from '../enums/tipo-depreciacao.materiais.enum';

export function toMaterialRequestDTO(material: MaterialResponseDTO): MaterialRequestDTO {
  return {
    nome: material.nome ?? '',
    situacao: material.situacao ?? Situacao.DISPONIVEL,
    patrimonio: material.patrimonio ?? '',
    imagem_url: material.imagemUrl,
    categoriaId: material.categoriaId ?? 0,
    setorId: material.setorId ?? 0,
    origemId: material.origemId ?? 0,
    localizacaoFisica: material.localizacaoFisica ?? '',
    dataAquisicao: material.dataAquisicao ?? '',
    valorCompra: material.valorCompra ?? 0,
    identificacaoRecibo: material.identificacaoRecibo ?? '',
    qrValor: material.qrValor ?? '',
    descricao: material.descricao ?? '',
    tipoDepreciacao: material.tipoDepreciacao ?? TipoDepreciacao.LINEAR,
    percentualDepreciacao: material.percentualDepreciacao ?? 0,
    vidaUtilAnos: material.vidaUtilAnos ?? 0,
    valorAtual: material.valorAtual ?? 0
  };
}
