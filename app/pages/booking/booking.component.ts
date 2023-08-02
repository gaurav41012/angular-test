import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  constructor(private userService:UserService,private router:Router){}

  //an array of boolean values representing whether a seat is booked or not
  public clicked : boolean[] = [];
  public onToggle(i:number,value:string): void {
    // Switch between red and green.
    if(this.clicked[i]== true){
      this.clicked[i] = false;
      this.temp[i] = "$"
    }
    else{
      this.clicked[i] = true;
      if(!this.temp.includes(value))
      this.temp[i] =value;
    }
 }
 //an array of string representing the selected seats
  public temp: string[] = []
 
//an object represents user's loginId,movieName......It is initialized with values obtained from the 'localstorage' 
  public user = {
    loginId: localStorage.getItem("username"),
    movieName : localStorage.getItem("movieToBook"),
    theatreName: "",
    noOfTickets: 0,
    seatNumber: this.temp,
  }

//lifeCycle hook. It makes a call to the 'userService' to search for a movie based on a movieName obtained from the localStorage.On success,it updates the 'theatreName' and 'movieName' of the 'user' object with the retrieved data.  
  ngOnInit():void {
    this.userService.searchMovie(this.user.movieName).subscribe(
      (data:any)=>{
        this.user.theatreName = data[0].theatreName;
        this.user.movieName = data[0].movieName;
      },
      (error)=>{
        console.log("Something went wrong!");
      }
    )
  }
//method is called when the user submit the form.
  formSubmit(){
    let seats: any = [];
//this iterates throught the 'temp' arrys,which contains the selected seats    
    this.temp.forEach(function (value : string){
//if value is not $ and not empty string then,it adds the seat to 'seats' array
      if(value != "$" && value != "")
          seats.push(value);
    });
//calculate noOfTickets by getting the length of 'seatNumber' and assign to seatNumber property of the 'user' object   
    this.user.seatNumber = seats;
    this.user.noOfTickets = this.user.seatNumber.length;
    if(this.user.seatNumber.length != 0){
      console.log("movie Name = "+this.user.movieName);
      console.log("theatre Name = "+this.user.theatreName);
      console.log("no of tikets ="+this.user.noOfTickets);
      console.log("Login Id = "+this.user.loginId);
      console.log("seatNumber = "+this.user.seatNumber);
      console.log("Submitted");
//bookTicket method of the userService to book the tickets.      
      this.userService.bookTicket(this.user).subscribe(
        (data: any)=>{
 //if the booking is successful
          Swal.fire('Booked',data,'success');
          console.log(data);
          this.router.navigate(['/api/v1.0/moviebooking/all']);
        },
//if there is an error during the booking        
        (error: any)=>{
          Swal.fire('Error Occured',error.error ,'info');
          console.log(JSON.stringify(error)); //logs error in the console
          this.router.navigate(['/api/v1.0/moviebooking/add']);
        }
      );
//after booking or handling the errors,the method resets the below arrys.cleared the selected seats.      
      this.clicked = [];
      this.user.seatNumber = [];
      this.temp = [];
    }
    else{
      Swal.fire('Provide Input','Select Seats of the Movies','info')
    }
  }

//method is called when the user clicks the 'remove' button to clear the selected seats.it reset the 'clicked','seatNumber' and 'temp' arrays.  
  remove(){
    this.clicked = [];
    this.user.seatNumber = [];
    this.temp = []
  }
}
