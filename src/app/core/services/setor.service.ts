import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetorRequestDTO } from '../models/setor/setorrequestdto.model';
import { SetorResponseDTO } from '../models/setor/setorresponsedto.model';
import { SetorApiResponse } from '../models/setor/setor-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private apiUrl = 'http://10.10.0.154:8080/api/v1/setores';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SetorResponseDTO[]> {
    return this.http.get<SetorApiResponse>(this.apiUrl).pipe(map((response: SetorApiResponse) => response._embedded.setores));
  }


  cadastrar(setor: SetorRequestDTO): Observable<SetorResponseDTO> {
    return this.http.post<SetorResponseDTO>(this.apiUrl, setor);
  }

  atualizar(id: number, setor: SetorRequestDTO): Observable<SetorResponseDTO> {
    return this.http.put<SetorResponseDTO>(`${this.apiUrl}/${id}`, setor);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verificarConexao(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verificar-conexao`, { responseType: 'text' as 'json' });
  }
}
