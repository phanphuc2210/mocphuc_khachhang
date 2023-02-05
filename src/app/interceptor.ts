import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token') != null) {
        const token = localStorage.getItem('token')!
        const headers = new HttpHeaders()
            .set('access-token', token)
            .set('Authorization', 'Bearer ' + token);
        const AuthRequest = request.clone({ headers: headers });
        return next.handle(AuthRequest);
    } else {
        return next.handle(request)
    }
  }
}