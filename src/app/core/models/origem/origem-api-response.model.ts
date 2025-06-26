import { OrigemResponseDTO } from './origemresponsedto.model'; // Importe o tipo MaterialResponseDTO

export interface OrigemApiResponse {
    _embedded: {
        origem: OrigemResponseDTO[]; // Array de materiais
    };
    _links: any; // Links relacionados, se necessário
    page: any; // Informações da página, se aplicável
}
