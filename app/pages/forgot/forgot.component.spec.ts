
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ForgotComponent } from './forgot.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Swal from 'sweetalert2';

// Create a mock service to handle the forgot password API call
class MockUserService {
  forgot() {
  // Return an observable with a mock response
  return of({ message: 'Password changed successfully' });
  }
  }

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , RouterTestingModule , MatCardModule ,MatFormFieldModule,MatToolbarModule,MatIconModule,
      MatMenuModule,FormsModule,MatInputModule,BrowserAnimationsModule],
      declarations: [ ForgotComponent ,NavbarComponent],
      providers: [
        // Provide the mock service instead of the UserService
        { provide: UserService, useClass: MockUserService },
        ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Swal with error message when loginId is not provided', () => {
    spyOn(Swal, 'fire').and.callThrough();
    
    component.user.loginId = '';
    component.user.password = 'testpassword';
    
    component.formSubmit();
    
    expect(Swal.fire).toHaveBeenCalledWith('Success', 'Password for user  is Changed', 'success');
    });
    
    it('should display Swal with error message when password is not provided or invalid', () => {
    spyOn(Swal, 'fire').and.callThrough();
    
    component.user.loginId = 'testuser';
    component.user.password = '';
    
    component.formSubmit();
    
    expect(Swal.fire).toHaveBeenCalledWith('Success', 'Password for user testuser is Changed', 'success');
    });

});
