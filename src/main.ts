import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { ConfirmationService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule),
    ConfirmationService
  ]
}).catch((err) => console.error(err));
