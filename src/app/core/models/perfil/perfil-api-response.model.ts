import { PerfilResponseDTO } from './perfilresponsedto.model';

export interface PerfilApiResponse {
    _embedded: {
        perfil: PerfilResponseDTO[];
    };
    _links: any;
    page: any;
}
