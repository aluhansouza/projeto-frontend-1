import { Perfil } from './perfil.model';

export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha?: string;
    perfilId?: number | null; // <- aqui a correção
    perfilNome: string;
}
