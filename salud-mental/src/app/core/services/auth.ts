import { Injectable } from '@angular/core';

export interface LocalUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: LocalUser[] = [
    {
      id: 1,
      name: 'Aministrador',
      email: 'admin@gmail.com',
      password: '123456',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Ana Martinez',
      email: 'ana@gmail.com',
      password: '123456',
      role: 'psicologa'
    },
    {
      id: 3,
      name: 'Paciente Demo',
      email: 'paciente@gmail.com',
      password: '123456',
      role: 'usuario'
    }
  ];

  login(email: string, password: string): { ok: boolean; message: string } {
    const user = this.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return {
        ok: false,
        message: 'Correo o contraseña incorrectos'
      };
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    localStorage.setItem('auth_user', JSON.stringify(sessionUser));
    localStorage.setItem('auth_token', 'token-local-demo');

    return {
      ok: true,
      message: 'Inicio de sesión exitoso'
    };
  }

  logout(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getUser(): any {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }
}