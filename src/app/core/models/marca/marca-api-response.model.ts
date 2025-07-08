import { MarcaResponseDTO } from './marcaresponsedto.model'; // Importe o tipo MaterialResponseDTO

export interface MarcaApiResponse {
    _embedded: {
        marcas: MarcaResponseDTO[]; // Array de materiais
    };
    _links: any; // Links relacionados, se necessário
    page: any; // Informações da página, se aplicável
}
