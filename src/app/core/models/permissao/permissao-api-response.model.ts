import { PermissaoResponseDTO } from './permissaoresponsedto.model';

export interface PermissaoApiResponse {
    _embedded: {
        permissao: PermissaoResponseDTO[];
    };
    _links: any;
    page: any;
}
