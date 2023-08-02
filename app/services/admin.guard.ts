import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
//canActivate:Angular will call to determine if the user is allowed to access a particular route.
export class AdminGuard implements CanActivate {
  constructor(private loginService:LoginService, private router:Router){}
//it takes two arguments:'route'(representing the current route) and 'state'(representing the router state) 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
//this method checks if the user is logged as a admin by calling the 'admingLogged()' method of the 'loginService'.Also if the user's role is 'admin' and user has a valid token and a valid userName.
      if(this.loginService.adminLoggedIn())
      return true;
//if the user is not an admin,the 'adminLogged()' method returns 'false' and it redirects the user to the login page using this url.      
    this.router.navigate(['/api/v1.0/moviebooking/login'])
    return false;
  }
  
}