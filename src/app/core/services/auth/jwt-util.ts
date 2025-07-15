import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  roles?: string[];
  authorities?: string[];
  [key: string]: any;
}

export function getRolesFromToken(token: string | null): string[] {
  if (!token) return [];
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.authorities ?? decoded.roles ?? [];
  } catch {
    return [];
  }
}

