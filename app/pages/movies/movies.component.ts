import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  constructor(private userService:UserService,private router:Router,public loginService:LoginService){}
  movies : {
    position: number,
    movieName: string,
    theaterName: string,
    ticketStatus: string,
    }[] = [];
  ngOnInit() : void {
    //HTTP request to the server to retrieve all movies.The allmovies() method return an observables,and the subscribe() method is used to listen for the response from the server.
    this.userService.allMovies().subscribe(
      (data:any) =>{
        let count = data.length;
        console.log(data.length);
        let i=1
        while(i <= count){
//for each movies,a new object with properties 'position' ,.... is created and pushed into the 'this.movies' array.         
          this.movies.push({
            position: i, movieName: data[i-1].movieName, theaterName: data[i-1].theatreName, ticketStatus: data[i-1].ticketsStatus
          });
          i++;
        }
        console.log("from movies Componenet :"+this.movies);
      },
//if there is an error in the HTTP request,this function will be executed.      
      (error)=>{
        let a: any=[];
        console.log("from movies Componenet :"+error);
      }
    );
      
  }
//this method is called when the 'booked ticket' button is clicked,it takes the value parameter.  
  onClickBuyTicket(value:any){
    console.log("Buying Ticket "+value);
    let flag = false; //determines if the movie is booked or not
//this iterates through the this.movies array, which contains the list of movies fetched from the server   
    this.movies.forEach(function (movie){
      if(value == movie.movieName && movie.ticketStatus == "SOLD OUT"){
        flag = true;
        Swal.fire('Cannot Book','This Movie is Sold Out','info');
      }
    })
//checks if the movie is not sold out and can be booked.    
    if(!flag){
      localStorage.setItem('movieToBook',value);  //the movie name 'value' is stored in localstorage with the key 'movieToBook'
      this.router.navigate(['/api/v1.0/moviebooking/add'])
    }
  }
}