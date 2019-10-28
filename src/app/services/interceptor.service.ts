import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class InterceptorService implements HttpInterceptor {
    token: string;

    constructor() {
        this.token = sessionStorage.getItem('token');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req.clone({
            headers: new HttpHeaders().append('Authorization', 'Bearer ' + this.token)
        });
        return next.handle(request);
    }
}
