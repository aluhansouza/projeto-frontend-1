import { CategoriaRequestDTO } from './categoriarequestdto.model';
import { CategoriaResponseDTO } from './categoriaresponsedto.model';

export function toCategoriaRequestDTO(setor: CategoriaResponseDTO): CategoriaRequestDTO {
  return {
    nome: setor.nome ?? '',
  };
}
