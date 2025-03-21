import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { api } from '../../constant';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private error: ErrorService
    ) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: 'Bearer ' + this.auth.token,
            'Content-Type': 'application/json'
        });
    }

    get<T>(apiUrl: string): Observable<T> {
        return this.http.get<T>(`${api}/${apiUrl}`, { headers: this.getHeaders() }).pipe(
            catchError((err: HttpErrorResponse) => this.handleError<T>(err))
        );
    }

    post<T>(apiUrl: string, body: any): Observable<T> {
        return this.http.post<T>(`${api}/${apiUrl}`, body, { headers: this.getHeaders() }).pipe(
            catchError((err: HttpErrorResponse) => this.handleError<T>(err))
        );
    }

    update<T>(apiUrl: string, body: any): Observable<T> {
        return this.http.put<T>(`${api}/${apiUrl}`, body, { headers: this.getHeaders() }).pipe(
            catchError((err: HttpErrorResponse) => this.handleError<T>(err))
        );
    }

    delete<T>(apiUrl: string): Observable<T> {
        return this.http.delete<T>(`${api}/${apiUrl}`, { headers: this.getHeaders() }).pipe(
            catchError((err: HttpErrorResponse) => this.handleError<T>(err))
        );
    }

    private handleError<T>(error: HttpErrorResponse): Observable<T> {
        this.error.errorHandler(error);  // ✅ Use ErrorService for toast notifications
        return throwError(() => new Error(error.message)); // ✅ Return an Observable error
    }
}