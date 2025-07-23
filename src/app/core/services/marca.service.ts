import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarcaRequestDTO } from '../models/marca/marcarequestdto.model';
import { MarcaResponseDTO } from '../models/marca/marcaresponsedto.model';
import { MarcaApiResponse } from '../models/marca/marca-api-response.model';

@Injectable({
    providedIn: 'root'
})
export class MarcaService {
    private apiUrl = 'http://10.10.0.154:8080/api/v1/marcas';

    constructor(private http: HttpClient) {}

    listarTodos(): Observable<MarcaResponseDTO[]> {
        return this.http.get<MarcaApiResponse>(this.apiUrl).pipe(map((response: MarcaApiResponse) => response._embedded.marcas));
    }

    cadastrar(marca: MarcaRequestDTO): Observable<MarcaResponseDTO> {
        return this.http.post<MarcaResponseDTO>(this.apiUrl, marca);
    }

    atualizar(id: number, marca: MarcaRequestDTO): Observable<MarcaResponseDTO> {
        return this.http.put<MarcaResponseDTO>(`${this.apiUrl}/${id}`, marca);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    verificarConexao(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/verificar-conexao`, { responseType: 'text' as 'json' });
    }
}
