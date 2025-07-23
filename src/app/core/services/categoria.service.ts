import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriaRequestDTO } from '../models/categoria/categoriarequestdto.model';
import { CategoriaResponseDTO } from '../models/categoria/categoriaresponsedto.model';
import { CategoriaApiResponse } from '../models/categoria/categoria-api-response.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private apiUrl = 'http://10.10.0.154:8080/api/v1/categorias';

    constructor(private http: HttpClient) {}

    listarTodos(): Observable<CategoriaResponseDTO[]> {
        return this.http.get<CategoriaApiResponse>(this.apiUrl).pipe(map((response: CategoriaApiResponse) => response._embedded.categorias));
    }

    cadastrar(categoria: CategoriaRequestDTO): Observable<CategoriaResponseDTO> {
        return this.http.post<CategoriaResponseDTO>(this.apiUrl, categoria);
    }

    atualizar(id: number, categoria: CategoriaRequestDTO): Observable<CategoriaResponseDTO> {
        return this.http.put<CategoriaResponseDTO>(`${this.apiUrl}/${id}`, categoria);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    verificarConexao(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/verificar-conexao`, { responseType: 'text' as 'json' });
    }
}
