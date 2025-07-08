import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormsModule,
    RouterModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    AppFloatingConfigurator
  ]
})
export class LoginComponent {

  login: string = ''; // Agora é genérico: pode ser e-mail ou nome de usuário
  password: string = '';
  rememberMe: boolean = false;
  submitted: boolean = false;

  constructor() {}

  loginUser(): void {
    this.submitted = true;

    if (!this.login || !this.password) {
      console.warn('Usuário/E-mail e senha são obrigatórios');
      return;
    }

    // Simulação de login
    console.log('Login com:', {
      login: this.login,
      password: this.password,
      lembrar: this.rememberMe
    });

    // Redirecionamento futuro
    // this.router.navigate(['/dashboard']);
  }
}
