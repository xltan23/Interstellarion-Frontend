import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSvc:AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    // Do not set any headers for these requests
    if (httpRequest.url.includes('/dreamer/register')) {
      return httpHandler.handle(httpRequest)
    }
    if (httpRequest.url.includes('/dreamer/login')) {
      return httpHandler.handle(httpRequest)
    }
    if (httpRequest.url.includes('/dreamer/forgetPassword')) {
      return httpHandler.handle(httpRequest)
    }
    this.authSvc.loadToken()
    const token = this.authSvc.getToken()
    // Clone the request (as it is immutable) and change the request 
    // These are paths that require authorization token
    const request = httpRequest.clone({setHeaders:{Authorization: `Bearer ${token}`}})
    return httpHandler.handle(request)
  }
}
