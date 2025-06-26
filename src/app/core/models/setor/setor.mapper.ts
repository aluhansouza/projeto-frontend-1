import { SetorRequestDTO } from './setorrequestdto.model';
import { SetorResponseDTO } from './setorresponsedto.model';

export function toSetorRequestDTO(setor: SetorResponseDTO): SetorRequestDTO {
  return {
    nome: setor.nome ?? '',
  };
}
