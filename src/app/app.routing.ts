import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//imports needed

const appRoutes: Routes = [
    //{ path: '', component: HomeComponent },
    // { path: 'Login', component: LoginComponent },
    // { path: 'Register', component: RegisterComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
