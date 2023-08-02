import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router){}
//*it takes two arguments route(representating the current state) and state(representing the router state)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
//this method checks whether the user is logged in by calling this method.If the user is logged in ,it return true   
      if(this.loginService.userLoggedIn()){
      return true;
    }
//if the user is not logged in ,then it redirects to the login page using this url and sweet alert . lastly it returns false indicating that the user in not allowed to access the route.    
    this.router.navigate(['/api/v1.0/moviebooking/login'])
    Swal.fire('Login required','To Book Movie Login First','info');
    return false;
  }
  
}
