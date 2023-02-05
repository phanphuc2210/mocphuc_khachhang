import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.loginSubject.value) {
      const token = localStorage.getItem('token')!
      const isTokenExpired = jwtHelper.isTokenExpired(token)
      if(isTokenExpired) {
        localStorage.clear()
        this.authService.loginSubject.next(false)
        this.authService.userSubject.next(null)

        Swal.fire({
          background: '#000',
          icon: 'warning',
          title: '<p class="text-xl text-slate-300">Bạn đã hết phiên làm việc. Vui lòng đăng nhập lại!</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })

        this.router.navigate(['/'])
        return false
      } else {
        return true
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.loginSubject.value) {
      const token = localStorage.getItem('token')!
      const isTokenExpired = jwtHelper.isTokenExpired(token)
      if(isTokenExpired) {
        localStorage.clear()
        this.authService.loginSubject.next(false)
        this.authService.userSubject.next(null)

        Swal.fire({
          background: '#000',
          icon: 'warning',
          title: '<p class="text-xl text-slate-300">Bạn đã hết phiên làm việc. Vui lòng đăng nhập lại!</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })

        this.router.navigate(['/'])
        return false
      } else {
        return true
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.loginSubject.value) {
      const token = localStorage.getItem('token')!
      const isTokenExpired = jwtHelper.isTokenExpired(token)
      if(isTokenExpired) {
        localStorage.clear()
        this.authService.loginSubject.next(false)
        this.authService.userSubject.next(null)

        Swal.fire({
          background: '#000',
          icon: 'warning',
          title: '<p class="text-xl text-slate-300">Bạn đã hết phiên làm việc. Vui lòng đăng nhập lại!</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })

        this.router.navigate(['/'])
        return false
      } else {
        return true
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

  constructor(private authService: AuthService, private router: Router){}
  
  
}
