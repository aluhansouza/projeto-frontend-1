import { MarcaRequestDTO } from './marcarequestdto.model';
import { MarcaResponseDTO } from './marcaresponsedto.model';

export function toMarcaRequestDTO(marca: MarcaResponseDTO): MarcaRequestDTO {
  return {
    nome: marca.nome ?? '',
  };
}
