import { Component } from '@angular/core';
import { NotificationsWidget } from '../dashboard/components/notificationswidget';
import { StatsWidget } from '../dashboard/components/statswidget';
import { BestSellingWidget } from '../dashboard/components/bestsellingwidget';
import { RevenueStreamWidget } from '../dashboard/components/revenuestreamwidget';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [StatsWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
