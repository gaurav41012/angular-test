import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,MatToolbarModule,MatIconModule,
      MatMenuModule],
      declarations: [ HomeComponent ,NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page', () => {
    const routerSpy=spyOn(component['router'],'navigate');
    component.login();
    expect(routerSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['api/v1.0/moviebooking/login']);
  });

  it('should navigate to register page', () => {
    const routerSpy=spyOn(component['router'],'navigate');
    component.register();
    expect(routerSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['api/v1.0/moviebooking/register']);
  });
  
});
