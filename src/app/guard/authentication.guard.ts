import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authSvc: AuthenticationService, private router: Router, private toastrSvc: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }
  
  isUserLoggedIn(): boolean {
    if (this.authSvc.isLoggedIn()) {
      return true
    }
    this.router.navigate(['/login'])
    this.toastrSvc.error('Please login to access this page.')
    return false
  }
}
