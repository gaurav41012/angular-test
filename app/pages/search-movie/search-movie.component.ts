import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent {
  constructor(private userService:UserService,public loginService:LoginService,private router:Router){}
  public movieName="";
  movies : {
    position: number,
    movieName: string,
    theaterName: string,
    ticketStatus: string,
    }[] = [];
  ngOnInit() : void {}
  search(){
    this.movies = [];

// this method checks whether the movieName property is empty or undefined   
    if(this.movieName == ''|| this.movieName == undefined)
    Swal.fire('',"Enter Movie Name",'info');
    else{
      console.log("Movie "+this.movieName+" is Searched");

// the searchMovie() method is expected to return an observable, and the subscribe() method is used to listen to the data returned by the observable.      
    this.userService.searchMovie(this.movieName).subscribe(
      // success callback of the subscribe() method 
      (data:any) =>{
        let count = data.length;
        let i=0
//inside the loop,each search result is pushed into the 'movie' array.A new movie object is created with properties like 'position','movieName',thretreName and 'ticketsStatus'        
        while(i < count){
          this.movies.push({
            position: i+1, movieName: data[i].movieName, theaterName: data[i].theatreName, ticketStatus: data[i].ticketsStatus
          });
          i++;
        }
        console.log("from search-movies Componenet"+this.movies);
      },
//if there is an error during the search, this error callback function is executed.      
      (error)=>{
        Swal.fire('',"Movie Not Found",'info');
        console.log("from search-movies Componenet :"+error);
      }
    );
    }
    console.log("Searching Movie");
  }

  onClickBuyTicket(movieToBook:any){
    console.log("Buying Ticket");
//keep track of whether the selected movie is sold out or not    
    let flag = false;

//the loop iterates each movie object in the 'movies' array and checks if the movieToBook matches the movie.movieName(current movie) and SOLD OUT.If selected movie matches the conditions then it sets the flag is true.    
    this.movies.forEach(function (movie){
      if(movieToBook == movie.movieName && movie.ticketStatus == "SOLD OUT"){
        flag = true;
        Swal.fire('Cannot Book','This Movie is Sold Out','info');
      }
    })

//if the flag is still 'false', it means that the selected movies is not sold out, then this method saves the movieToBook to the local storage, so that it can be retrieved later on the booking page and navigate to the url using the Router service.    
    if(!flag){
      localStorage.setItem('movieToBook',movieToBook);
      this.router.navigate(['/api/v1.0/moviebooking/add'])
    }
  }
}
