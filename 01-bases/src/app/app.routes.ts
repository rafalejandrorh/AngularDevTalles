import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';

export const routes: Routes = [
    {
        path: 'hero',
        component: HeroPageComponent
    },
    {
        path: 'counter',
        component: CounterPageComponent
    },
    {
        path: '**',
        redirectTo: 'hero'
    }
];
