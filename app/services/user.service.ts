import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//it injects the HttpClient that allows the services to make HTTP requests to interact with backend API
  constructor(private http: HttpClient) { }

  //add user
  public register(user : any){
      return this.http.post('http://localhost:8080/api/v1.0/moviebooking/register',user)
  }
  //forgot password
  public forgot(user:any){
    return this.http.put('http://localhost:8080/api/v1.0/moviebooking/'+user.loginId+'/forgot',user,{responseType: 'text'})
  }
  //retrieves all movies  
  public allMovies(){
    return this.http.get('http://localhost:8080/api/v1.0/moviebooking/all');
  }
  //search for a movies
  public searchMovie(movieName:any){
    return this.http.get('http://localhost:8080/api/v1.0/moviebooking/movies/search/'+movieName)
  }
  //update the status of a movie ticket
  public updateTicketStatus(movieName:any){
    return this.http.put('http://localhost:8080/api/v1.0/moviebooking/'+movieName+'/update',movieName,{responseType: 'text'});
  }
  //delete a movie
  public deleteMovie(movieName:any){
    return this.http.delete('http://localhost:8080/api/v1.0/moviebooking/'+movieName+'/delete',{responseType: 'text'});
  }
  //book a movie ticket
  public bookTicket(user:any){
    return this.http.post('http://localhost:8080/api/v1.0/moviebooking/'+user.movieName+'/add',user,{responseType: 'text'});
  }
  //retrieves all booked tickets for a specific movie
  public getallbookedtickets(movieName : any){
    return this.http.get('http://localhost:8080/api/v1.0/moviebooking/getallbookedtickets/'+movieName);
  }
}