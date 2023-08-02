import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchMovieComponent } from './search-movie.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Swal from 'sweetalert2';

// Create a mock service to handle the searchMovie API call
class MockUserService {
  searchMovie(movieName:String) {
    if(movieName==='Movie Y'){
      return of([]);
    }
  // Return an observable with a mock response
  return of([
  { movieName: 'Movie 1', theatreName: 'Theatre A', ticketsStatus: 'AVAILABLE' },
  { movieName: 'Movie 2', theatreName: 'Theatre B', ticketsStatus: 'SOLD OUT' },
  { movieName: 'Movie 3', theatreName: 'Theatre C', ticketsStatus: 'AVAILABLE' }
  ]);
  }
  }

describe('SearchMovieComponent', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    userService = new MockUserService();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , RouterTestingModule , MatCardModule ,MatFormFieldModule,MatDividerModule,MatToolbarModule,MatIconModule,MatMenuModule,
      FormsModule,MatInputModule,BrowserAnimationsModule],

      declarations: [ SearchMovieComponent ,NavbarComponent],
      providers: [
        // Provide the mock service instead of the UserService
        { provide:UserService, useClass: MockUserService }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Swal with info message when the movie name is not provided', () => {
    spyOn(Swal, 'fire').and.callThrough();
    
    component.movieName = '';
    component.search();
    
    expect(Swal.fire).toHaveBeenCalledWith('', 'Enter Movie Name', 'info');
    });

    it('should display Swal with info message when no movie is found on search', () => {
      spyOn(Swal, 'fire').and.callThrough();
      
      component.search();
      
      expect(Swal.fire).toHaveBeenCalledWith('', 'Enter Movie Name', 'info');
      });
      

});
