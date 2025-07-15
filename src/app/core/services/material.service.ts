import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialRequestDTO } from '../models/material/materialrequestdto.model';
import { MaterialResponseDTO } from '../models/material/materialresponsedto.model';
import { MaterialApiResponse } from '../models/material/material-api-response.model';

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private apiUrl = 'http://10.10.0.154:8080/api/v1/materiais';

    constructor(private http: HttpClient) {}

    listarTodos(): Observable<MaterialApiResponse> {
        // Alterado para retornar ApiResponse
        return this.http.get<MaterialApiResponse>(`${this.apiUrl}`);
    }

    cadastrar(material: MaterialRequestDTO, imagem?: File): Observable<MaterialResponseDTO> {
        const formData = new FormData();

        // Adiciona todos os campos do material ao formData
        Object.entries(material).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as string | Blob);
            }
        });

        // Se houver imagem, adiciona ao formData
        if (imagem) {
            formData.append('imagem', imagem);
        }

        return this.http.post<MaterialResponseDTO>(`${this.apiUrl}`, formData);
    }

    atualizar(id: number, material: MaterialRequestDTO, imagem?: File): Observable<MaterialResponseDTO> {
        const formData = new FormData();

        // Adiciona todos os campos do material ao formData
        Object.entries(material).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as string | Blob);
            }
        });

        // Se houver imagem, adiciona ao formData
        if (imagem) {
            formData.append('imagem', imagem);
        }

        return this.http.put<MaterialResponseDTO>(`${this.apiUrl}/${id}`, formData);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Método para verificar a conexão com o backend
    verificarConexao(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/verificar-conexao`, { responseType: 'text' as 'json' });
    }

    cadastrarComImagem(formData: FormData): Observable<MaterialResponseDTO> {
        return this.http.post<MaterialResponseDTO>(`${this.apiUrl}`, formData);
    }

    atualizarComImagem(id: number, formData: FormData): Observable<MaterialResponseDTO> {
        return this.http.put<MaterialResponseDTO>(`${this.apiUrl}/${id}`, formData);
    }
    buscarPorId(id: number): Observable<MaterialResponseDTO> {
        return this.http.get<MaterialResponseDTO>(`${this.apiUrl}/${id}`);
    }
}
