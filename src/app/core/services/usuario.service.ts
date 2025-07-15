import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Perfil } from '../models/perfil.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://10.10.0.154:8080/api';

    constructor(private http: HttpClient) {}

    listarTodos(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
    }

    cadastrar(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
    }

    atualizar(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
    }

    listarTodosPerfis(): Observable<Perfil[]> {
        return this.http.get<Perfil[]>(`${this.apiUrl}/perfis`);
    }
}
