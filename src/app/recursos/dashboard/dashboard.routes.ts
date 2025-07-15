import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../core/services/auth/auth.guard';

export default [{ path: '', component: DashboardComponent, canActivate: [authGuard] }] as Routes;
