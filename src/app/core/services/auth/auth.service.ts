import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://10.10.0.154:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        this.setToken(response.accessToken);
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Retorna as roles do usuário autenticado com base no token JWT.
   * Simula temporariamente ROLE_ADMINISTRADOR.
   */
  getRoles(): string[] {
    // --- SIMULAÇÃO TEMPORÁRIA ---
    return ['ROLE_ADMINISTRADOR'];

    // --- ORIGINAL ---
    // const token = this.getToken();
    // if (!token) return [];
    // try {
    //   const decoded: any = jwtDecode(token);
    //   return decoded.authorities ?? decoded.roles ?? [];
    // } catch {
    //   return [];
    // }
  }

  /**
   * Verifica se o usuário possui pelo menos uma das roles informadas.
   */
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getRoles();
    return roles.some(role => userRoles.includes(role));
  }
}
