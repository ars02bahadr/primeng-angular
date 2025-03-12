import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Empty } from './app/pages/empty/empty';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Empty },
        ]
    },
];
