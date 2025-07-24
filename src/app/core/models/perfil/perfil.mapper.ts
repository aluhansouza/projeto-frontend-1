import { PerfilRequestDTO } from './perfilrequestdto.model';
import { PerfilResponseDTO } from './perfilresponsedto.model';

export function toPerfilRequestDTO(perfil: PerfilResponseDTO): PerfilRequestDTO {
  return {
    nome: perfil.nome ?? '',
  };
}
