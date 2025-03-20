import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { api } from '../../constant';
import { ResultModel } from './result.model';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private errorService: ErrorService
    ) {}

    get<T>(apiUrl: string): Observable<T> {
        return this.http.get<T>(`${api}/${apiUrl}`, {
            headers: {
                Authorization: 'Bearer ' + this.auth.token
            }
        });
    }

    post<T>(apiUrl: string, body: any): Observable<T> {
        return this.http.post<T>(`${api}/${apiUrl}`, body, {
            headers: {
                Authorization: 'Bearer ' + this.auth.token
            }
        });
    }

    update<T>(apiUrl: string, body: any): Observable<T> {
        return this.http.put<T>(`${api}/${apiUrl}`, body, {
            headers: {
                Authorization: 'Bearer ' + this.auth.token
            }
        });
    }

    delete<T>(apiUrl: string): Observable<T> {
        return this.http.delete<T>(`${api}/${apiUrl}`, {
            headers: {
                Authorization: 'Bearer ' + this.auth.token
            }
        });
    }
}
