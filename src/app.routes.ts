import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Empty } from './app/pages/empty/empty';
import { inject } from '@angular/core';
import { AuthService } from './app/shared/auth.service';
import { LoginComponent } from './app/pages/auth/login.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivateChild: [()=> inject(AuthService).isAuthenticated()],
        children: [
            { path: '', component: Empty },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
