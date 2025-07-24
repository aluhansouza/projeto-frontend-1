import { PermissaoRequestDTO } from './permissaorequestdto.model';
import { PermissaoResponseDTO } from './permissaoresponsedto.model';

export function toPermissaoRequestDTO(permissao: PermissaoResponseDTO): PermissaoRequestDTO {
  return {
    nome: permissao.nome ?? '',
  };
}
