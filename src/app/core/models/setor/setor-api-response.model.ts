import { SetorResponseDTO } from './setorresponsedto.model'; // Importe o tipo MaterialResponseDTO

export interface SetorApiResponse {
    _embedded: {
        setores: SetorResponseDTO[]; // Array de materiais
    };
    _links: any; // Links relacionados, se necessário
    page: any; // Informações da página, se aplicável
}
