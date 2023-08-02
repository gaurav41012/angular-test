import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule , MatCardModule,MatFormFieldModule,MatToolbarModule,MatIconModule,
      MatMenuModule,MatInputModule,FormsModule,BrowserAnimationsModule],
      declarations: [ LoginComponent , NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alert if loginId is not provided', () => {
    component.user.loginId='';
    component.user.password='password';
    spyOn(window,'alert');
    component.formSubmit();
    expect(window.alert).toHaveBeenCalledWith('Enter Username!');
  })

  it('should display alert if password is not provided', () => {
    component.user.loginId='username';
    component.user.password='';
    spyOn(window,'alert');
    component.formSubmit();
    expect(window.alert).toHaveBeenCalledWith('Enter password!');
  })

});
