import { CategoriaResponseDTO } from './categoriaresponsedto.model'; // Importe o tipo MaterialResponseDTO

export interface CategoriaApiResponse {
    _embedded: {
        categoria: CategoriaResponseDTO[]; // Array de materiais
    };
    _links: any; // Links relacionados, se necessário
    page: any; // Informações da página, se aplicável
}
