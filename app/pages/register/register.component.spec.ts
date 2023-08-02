import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Swal from 'sweetalert2';

// Create a mock service to handle registration API call
class MockUserService {
  register() {
  // Return an observable with a mock response
  return of({ message: 'Registration successful' });
  }
  }

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , RouterTestingModule ,MatCardModule,MatFormFieldModule,MatRadioModule,MatToolbarModule,MatIconModule,MatMenuModule,FormsModule,MatInputModule,BrowserAnimationsModule],

      declarations: [ RegisterComponent ,NavbarComponent],
      providers: [
        // Provide the mock service instead of the UserService
        { provide:UserService, useClass: MockUserService }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Swal with error message when loginId is not provided', () => {
    component.user.loginId = '';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'User Name is required !', 'info');
    });
    
    it('should display Swal with error message when firstName is not provided', () => {
    component.user.loginId = 'username';
    component.user.firstName = '';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'First Name is required', 'info');
    });
    
    it('should display Swal with error message when lastName is not provided', () => {
    component.user.loginId = 'username';
    component.user.firstName = 'John';
    component.user.lastName = '';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Last Name is required !', 'info');
    });
    
    it('should display Swal with error message when role is not selected', () => {
    component.user.loginId = 'username';
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.admin = false;
    component.user.users = false;
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Select Role !', 'info');
    });
    
    it('should display Swal with error message when email is not provided', () => {
    component.user.loginId = 'username';
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.admin = true;
    component.user.email = '';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Email is Required!', 'info');
    });
    
    it('should display Swal with error message when contactNumber is not provided or invalid', () => {
    component.user.loginId = 'username';
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.admin = true;
    component.user.email = 'john.doe@example.com';
    component.user.contactNumber = '';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Enter Correct Contact Number', 'info');
    
    component.user.contactNumber = '123456';
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Enter Correct Contact Number', 'info');
    });
    
    it('should display Swal with error message when password is not provided or invalid', () => {
    component.user.loginId = 'username';
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.admin = true;
    component.user.email = 'john.doe@example.com';
    component.user.contactNumber = '1234567890';
    component.user.password = '';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Enter Valid Password!', 'info');
    
    component.user.password = 'password';
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('', 'Enter Valid Password!', 'info');
    });
    
    it('should display Swal with error message when confirmPassword does not match password', () => {
    component.user.loginId = 'username';
    component.user.firstName = 'John';
    component.user.lastName = 'Doe';
    component.user.admin = true;
    component.user.email = 'john.doe@example.com';
    component.user.contactNumber = '1234567890';
    component.user.password = 'password';
    component.user.confirmPassword = 'pass';
    spyOn(Swal, 'fire').and.callThrough();
    component.formSubmit();
    expect(Swal.fire).toHaveBeenCalledWith('Oops!', 'Enter Correct Password!', 'error');
    expect(component.user.confirmPassword).toEqual('');
    });
  
});
