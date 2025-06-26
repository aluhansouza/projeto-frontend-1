import { OrigemRequestDTO } from './origemrequestdto.model';
import { OrigemResponseDTO } from './origemresponsedto.model';

export function toOrigemRequestDTO(origem: OrigemResponseDTO): OrigemRequestDTO {
  return {
    nome: origem.nome ?? '',
  };
}
