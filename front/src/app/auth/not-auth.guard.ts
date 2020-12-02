import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private authService : AuthService,private http : HttpClient,private router : Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var body = {
      token: this.authService.getToken()
    }

    var options = {
      headers: { }
    }
    return this.http.post<any>('http://localhost:8000/auth',body,options).pipe(
      map(response=>{
        if(response.auth){
          this.router.navigate([""]);
          return false
        }
        return true
      })
      
    )
  }
  
}
