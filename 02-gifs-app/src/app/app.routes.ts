import { Routes } from '@angular/router';
//import { DashboardPageComponent } from './gifs/pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>  import('./gifs/pages/dashboard-page/dashboard-page.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
