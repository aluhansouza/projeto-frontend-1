import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrigemRequestDTO } from '../models/origem/origemrequestdto.model';
import { OrigemResponseDTO } from '../models/origem/origemresponsedto.model';
import { OrigemApiResponse } from '../models/origem/origem-api-response.model';

@Injectable({
    providedIn: 'root'
})
export class OrigemService {
    private apiUrl = 'http://10.10.0.154:8080/api/v1/origens';

    constructor(private http: HttpClient) {}

    listarTodos(): Observable<OrigemResponseDTO[]> {
        return this.http.get<OrigemApiResponse>(this.apiUrl).pipe(map((response: OrigemApiResponse) => response._embedded.origens));
    }

    cadastrar(origem: OrigemRequestDTO): Observable<OrigemResponseDTO> {
        return this.http.post<OrigemResponseDTO>(this.apiUrl, origem);
    }

    atualizar(id: number, origem: OrigemRequestDTO): Observable<OrigemResponseDTO> {
        return this.http.put<OrigemResponseDTO>(`${this.apiUrl}/${id}`, origem);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    verificarConexao(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/verificar-conexao`, { responseType: 'text' as 'json' });
    }
}
