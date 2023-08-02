import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-ticket-status',
  templateUrl: './update-ticket-status.component.html',
  styleUrls: ['./update-ticket-status.component.css']
})
export class UpdateTicketStatusComponent {
  constructor(private userService:UserService,private router:Router){}
  ngOnInit() : void {}

  //this property named clicked with the typescript type.This notation represents an object with keys of type 'number' and values of type 'boolean'
  public clicked: {[key: number]: boolean} = {}; 

  //i-index , key and value pair.inside onToogle method,it uses the switch between the clicked state of the button with the given index 'i'. if value is true it becomes false or vice-versa.After toggling the clicked state,it displays an alert box showing the value associated with the clicked button.
  public onToggle(i:number,value:string): void {
    // Switch between red and green.
    this.clicked[i] = !this.clicked[i];
    alert("value = "+ value);
 }
}