//this is a component responsible for displaying the home page of the movie booking application.
import { CdkHeaderCellDef } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public loginService:LoginService,private router:Router){}
  ngOnInit(){}
  // when below method is called, it trigger navigation to the below 'url' using the router.navigate method 
  login(){
    this.router.navigate(['api/v1.0/moviebooking/login']);
  }
  register(){
    this.router.navigate(['api/v1.0/moviebooking/register']);
  }
}