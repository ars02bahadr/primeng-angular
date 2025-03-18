import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpService } from './app/shared/http.service';
import { ErrorService } from './app/shared/error.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`,
    providers:[
        HttpService,
        ErrorService,
        MessageService,
        ConfirmationService,
    ]
})
export class AppComponent {}
