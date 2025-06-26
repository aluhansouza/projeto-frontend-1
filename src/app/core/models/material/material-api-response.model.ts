import { MaterialResponseDTO } from './materialresponsedto.model'; // Importe o tipo MaterialResponseDTO

export interface MaterialApiResponse {
    _embedded: {
        materiais: MaterialResponseDTO[]; // Array de materiais
    };
    _links: any; // Links relacionados, se necessário
    page: any; // Informações da página, se aplicável
}
