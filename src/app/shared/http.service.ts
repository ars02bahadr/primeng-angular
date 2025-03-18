import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { api } from '../../constant';
import { ResultModel } from './result.model';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private errorService: ErrorService
    ) {}

    get<T>(apiUrl: string, callBack: (res: T) => void, errorCallBack?: () => void) {
        this.http
            .post<ResultModel<T>>(`${api}/${apiUrl}`, {
                headers: {
                    Authorization: 'Bearer ' + this.auth.token
                }
            })
            .subscribe({
                next: (res) => {
                    if (res.data) {
                        callBack(res.data);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.errorService.errorHandler(err);
                    if (errorCallBack) {
                        errorCallBack();
                    }
                }
            });
    }

    post<T>(apiUrl: string, body: any, callBack: (res: T) => void, errorCallBack?: () => void) {
        this.http
            .post<ResultModel<T>>(`${api}/${apiUrl}`, body, {
                headers: {
                    Authorization: 'Bearer ' + this.auth.token
                }
            })
            .subscribe({
                next: (res) => {
                    if (res.data) {
                        callBack(res.data);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.errorService.errorHandler(err);
                    if (errorCallBack) {
                        errorCallBack();
                    }
                }
            });
    }
}
