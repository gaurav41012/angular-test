import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

//it injects the HttpClient instances into the 'loginService' class,makes the HTTP request
  constructor(private http: HttpClient) { }

  //login
  public login(user: any){
    return this.http.post('http://localhost:8080/api/v1.0/moviebooking/login',user)
  }

  //Storing token to local and this method store the authenctication token in the local storage with the key 'token'
  public saveToken(token: any){
    localStorage.setItem('token',token);
    return true;
  }
//method checks if a valid token exists in the local storage.if it's empty or undefined then it return false(user in not logged in) otherwise true.
  public checkToken(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr == null|| tokenStr == ''|| tokenStr == undefined){
      return false;
    }else{
      return true;
    }
  }
//logout:this method logout the user by removing all user-related data from the local storage
  public logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userRole")
    localStorage.removeItem("movieToBook")
    localStorage.removeItem("movieName")
    localStorage.removeItem("seat")
    localStorage.removeItem("seatNumber")
    localStorage.removeItem("role")
    return true;
  }
//retrieves authentication token from the local storage
  public getToken(){
    return localStorage.getItem('token');
  }

//set user to local storage
  public setUsername(username:any){
    localStorage.setItem('username',username);
  }
  //set _id of the user in the local storage
  public setId(id:any){
    localStorage.setItem('_id',id);
  }
//set user role to local storage,derived from the user's role string by removing the first 5 characters and converting it to lowercase
  public setRole(role:string){
    localStorage.setItem('role',role.substring(5).toLowerCase())
  }
//get username from the local storage.If userName is not available,it will logout the user and return null
  public getUsername(){
    let userStr = localStorage.getItem("username");
    if(userStr != null){
      return userStr;
    }
    else{
      this.logout();
      return null;
    }
  }
  //retrieves user's role from the local storage
  public getRole(){
    return localStorage.getItem("role");
  }
  //check user is logged in whose role is 'user' based on the stored token,role and userName.If conditions satisfied then return true otherwise false.
  public userLoggedIn(){
    if(this.getRole() == "user" && this.checkToken() && this.getUsername() != null ){
        return true;
    }
    return false;
  }
  //check admin is logged in
  public adminLoggedIn(){
    if(this.getRole() == "admin" && this.checkToken() && this.getUsername() != null ){
        return true;
    }
    return false;
  }
}
