import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'basic',
        title: 'Basic Pipes',
        loadComponent: () => import('./pages/basic-pages/basic-page').then(m => m.default)
    },
    {
        path: 'numbers',
        title: 'Numbers Pipes',
        loadComponent: () => import('./pages/numbers-page/numbers-page').then(m => m.default)
    },
    {
        path: 'uncommon',
        title: 'Uncommon Pipes',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page').then(m => m.default)
    },
    {
        path: 'custom',
        title: 'Custom Pipes',
        loadComponent: () => import('./pages/custom-page/custom-page').then(m => m.default)
    },
    {
        path: '**',
        redirectTo: 'basic'
    }
];
