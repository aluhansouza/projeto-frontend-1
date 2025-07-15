import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, FormsModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule, AppFloatingConfigurator]
})
export class LoginComponent {
    login: string = '';
    password: string = '';
    rememberMe: boolean = false;
    submitted: boolean = false;
    loading: boolean = false;
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    loginUsuario(): void {
        this.submitted = true;
        this.error = '';

        if (!this.login || !this.password) {
            this.error = 'Usuário/E-mail e senha são obrigatórios';
            return;
        }

        this.loading = true;
        this.authService.login(this.login, this.password).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: () => {
                this.loading = false;
                this.error = 'Usuário ou senha inválidos!';
            }
        });
    }
}
