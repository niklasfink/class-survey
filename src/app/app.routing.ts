import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

const appRoutes: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'register',
    component: RegisterComponent
},
{
    path: 'create-survey',
    component: CreateSurveyComponent
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
