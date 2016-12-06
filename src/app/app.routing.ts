import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyOverviewComponent } from './survey-overview/survey-overview.component';
import { HomeComponent } from './home/home.component';
import { SurveyParticipateComponent } from './survey-participate/survey-participate.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'survey-create', component: SurveyCreateComponent },
    { path: 'survey-overview', component: SurveyOverviewComponent },
    { path: 'survey', redirectTo: '', pathMatch: 'full' },
    { path: 'survey/:id', component: SurveyParticipateComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);