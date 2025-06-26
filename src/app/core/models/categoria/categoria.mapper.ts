import { CategoriaRequestDTO } from './categoriarequestdto.model';
import { CategoriaResponseDTO } from './categoriaresponsedto.model';

export function toCategoriaRequestDTO(categoria: CategoriaResponseDTO): CategoriaRequestDTO {
  return {
    nome: categoria.nome ?? '',
  };
}
